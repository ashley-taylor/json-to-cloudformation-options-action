const fs = require('fs');
const core = require('@actions/core');

(async () => {
    try {
        const path = core.getInput('path');
        const data = await fs.promises.readFile(path);
        const json = JSON.parse(data);
        let toReturn = ''

        for(const property in json) {
            if(toReturn.length > 0) {
                toReturn += ' ';
            }
            toReturn += `"${property}=${json[property]}"`
        }
        core.setOutput("value", toReturn);
    } catch (error) {
   		core.setFailed(error.message);
    }
})();
