

function Files() {
    const isAcceptedFileFormat = (filename) => {
        filename.endsWith('py') ||
		filename.endsWith('cpp') ||
		filename.endsWith('java') ||
		filename.endsWith('js');
    };

    const addNewFile = () => {
        const filename = window.prompt('Please enter file name');

        if(filename !== '' && filename !==null && isAcceptedFileFormat(filename)) {
            const isFilePresent = filesList.filter((name) => name === filename).length;

            let extension = filename.toLowerCase().split('.').pop();
            
            if(extension === 'py') {
                extension = 'python';
            } else if(extension === 'js') {
                extension = 'javascript';
            }

            if(isFilePresent) {
                toast.error("File name cannot be same");
                return;
            }

            addFile({
                name: filename,
                language: extension,
                value: ""
            });
        } else if(filename) {
            toast.error("File format not supported! Only .py, .cpp, .java, .js 😔");
        }
    }

    const deleteFile = (e, filename) => {
        e.stopPropagation();
        const doDelete = window.confirm("Are you sure you want to delete this file?");

        if (doDelete) {
            removeFile(filename);
        }
    }

    return (
        <>
        </>
    );
}

export default Files;