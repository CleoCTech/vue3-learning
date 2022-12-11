import swal from "sweetalert";

export function useFlash() {
    function flash(title, message,level = 'success') {
        return swal(title, message, level);
    }

    //return whatever you want to expose to outside world
    return { flash };
}