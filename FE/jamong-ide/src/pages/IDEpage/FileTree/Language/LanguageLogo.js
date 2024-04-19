import PYTHONLogo from "../../../../assets/python.svg";
import CPPLogo from "../../../../assets/cpp.svg";
import JAVALogo from "../../../../assets/java.svg";
import JAVASCRIPTLogo from "../../../../assets/javascript.svg";

function LanguageLogo({ fileName }) {
    const languageLogo = (fileName) => {
        const fileType = fileName.toLowerCase().split('.').pop();

        switch(fileType) {
            case 'py':
                return PYTHONLogo;
            case 'cpp':
                return CPPLogo;
            case 'java':
                return JAVALogo;
            case 'js':
                return JAVASCRIPTLogo;
            default:
                return fileName;
        }
    };

    return (
        <>
            <img width={16} height={16} src={languageLogo(fileName)} alt="Language" />
            <span style={{marginLeft: 5}}>{fileName}</span>
        </>
    );
}

export default LanguageLogo;