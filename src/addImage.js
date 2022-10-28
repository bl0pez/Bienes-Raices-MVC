import { Dropzone } from "dropzone";

Dropzone.options.image = {
    dictDefaultMessage: "Arrastra las imagenes aqui para subirlas",
    acceptedFiles: ".png, .jpg, .jpeg",
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: "Eliminar Imagen",
    dictMaxFilesExceeded: "Solo puedes subir 1 imagen",
    paramName: "image",
    init: function () {
        const dropzone = this;

        const btnPublicar = document.querySelector("#publicar");

        btnPublicar.addEventListener("click", function () {
            dropzone.processQueue();
        });

        //Se llama cuando el archivo se sube correctamente
        dropzone.on('queuecomplete', function(file, message){
            if(dropzone.getActiveFiles().length == 0){
                window.location.href = "/mis-propiedades";
            }
        });

    }
}