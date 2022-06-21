const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

const GoStumble = (auth) => new Promise((resolve, reject) => {

    fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/${code}', {
        method: 'GET',
        headers: {
            'authorization': auth
        }
    })
    .then(res => res.text())
    .then(data=> {
        resolve(data);
    })
    .catch(err => {
        reject(err);
    });

});

(async () => {

    console.log(`
    
ＳＴＵＭＢＬＥ   ＨＡＣＫ V3

By : ${chalk.red('@ArjunaGimank')} ${chalk.blue('')}
Features :
1. ${chalk.magenta('Push Crown + Trophy')}
2. ${chalk.magenta('Push Trophy')}
`);

    const feature = rs.question('[+] Pilih Fitur 1 atau 2 : ');
    const auth = rs.question('[+] Auth Token : ');
    console.log('');

    if (feature == '1') {

        while (true) {

            var code = '3';
            const result = await GoStumble(code, auth);
            if (!result) {

                console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] [401] Wrong Token or Expired Token !`));
                break;

            } else if (result.includes('User')) {

                const data = JSON.parse(result);
                const username = data.User.Username;
                const country = data.User.Country;
                const trophy = data.User.SkillRating;
                const crown = data.User.Crowns;
                
                console.log(chalk.green(`\r[ ${moment().format('HH:mm:ss')} ] Sukses ! | Nama : ${username} | Negara : ${country} | ${chalk.blue(`Tropi : ${trophy}`)} | ${chalk.blue(`Mahkota : ${crown}`)}`));
                

            } else if (result == 'BANNED') {

                console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Yahahaha Ke Ban !`));
                break;
                
            } else if (result == 'SERVER_ERROR') {

                continue;
                
            }
        }
        
    } else if (feature == '2') {

        while (true) {

            var code = '2';
            const result = await GoStumble(code, auth);
            if (!result) {

                console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] [401] Wrong Token or Expired Token !`));
                break;

            } else if (result.includes('User')) {

                const data = JSON.parse(result);
                const username = data.User.Username;
                const country = data.User.Country;
                const trophy = data.User.SkillRating;
                
                console.log(chalk.green(`\r[ ${moment().format('HH:mm:ss')} ] Sukses! | Nama : ${username} | Negara : ${country} | ${chalk.blue(`Tropi : ${trophy}`)}`));
                
            } else if (result == 'BANNED') {

                console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Yahahaha Ke Ban !`));
                break;
                
            } else if (result == 'SERVER_ERROR') {

                continue;
                
            }
        }

    } else {

        console.log(chalk.red('[!] Fitur Tidak Ada! '));

    }
    

})();
