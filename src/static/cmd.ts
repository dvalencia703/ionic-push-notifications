export module cmd {

    export let enable: boolean = true;

    export function log(module: string, section: string, msg: string) {
        if (enable) {
            console.log(`Module: ${module}, Section: ${section}: => Message: ${msg}`);
        }
    }

    export function logError(module: string, section: string, error: Error, showAlert: boolean = false, closeApplication: boolean = false) {

        if (closeApplication) {
            if (error.message) {
                console.log(`Module: ${module}, Section: ${section}: => Message: ${error.message}`);
            } else {
                console.log(`Module: ${module}, Section: ${section}: => Message (json): ${JSON.stringify(error)}`);
            }
            
            console.log(`Closing applicaction`);
            return;
        } else if (enable) {
            if (error.message) {
                console.log(`Module: ${module}, Section: ${section}: => Message: ${error.message}`);
            } else {
                console.log(`Module: ${module}, Section: ${section}: => Message (json): ${JSON.stringify(error)}`);
            }
        }
    }

}