import { ref, watch } from 'vue';

export function useLocalStorage(key, val = null) {
    let storedVal = read();

    if (storedVal) {
        val = ref(storedVal);
    } else {
        val = ref(val); 
        write();
    }

    watch(val, write, {deep : true}); //when you turn deep into true it can be costly in terms of performance

    function read() {
        return JSON.parse(localStorage.getItem(key));
    }
    function write(){
        if (val.value == '' || val.value == null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key,  JSON.stringify(val.value));
        }
        
    }

    return val;
}
// @cleo