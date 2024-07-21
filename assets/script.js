const apiKey = 'F4DBBAF8-45B0-11EF-95CB-42010A80000E';
const senIndArr = ['100755', '100735', '100763'];
let statusArr = [];

var  parentEl = document.getElementById('card');
for (i=0; i<senIndArr.length; i++) {
    let x = Math.floor(Math.random() * 10)%2;
    console.log(x);
    statusArr.push(x);

    let senInd = senIndArr[i];
    let Url = "https://api.purpleair.com/v1/sensors/"+senInd+"?api_key="+apiKey;
    fetch(Url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            let senName = data['sensor']['name'];
            let pm25 = data['sensor']['pm2.5'];
            let color = getColor(pm25);
            let level = getLevel(pm25);
            let element = document.createElement('div');
            element.id = senInd;
            let nameEl = document.createElement('h1');
            nameEl.className = 'name';
            nameEl.textContent = senName;
            let pmEl = document.createElement('h1');
            pmEl.className = 'pm';
            pmEl.textContent = pm25;
            let levelEl = document.createElement('h1');
            levelEl.className = 'level';
            levelEl.textContent = level;
            let messageEl = document.createElement('h1');
            messageEl.className = 'message';
            messageEl.textContent = 'Calibrate Now!';
            element.appendChild(nameEl);
            element.appendChild(pmEl);
            element.appendChild(levelEl);
            element.appendChild(messageEl);
            element.style.backgroundColor = color;
            if (!x) {
                element.classList.add('hidden');
            }
            parentEl.appendChild(element);
        })
        .catch(function(error) {
            console.log(error);
        })

}

function getColor(pm) {
    if (pm <= 12) {
        color = 'green';
    }
    else if (pm > 12 & pm <= 35) {
        color = 'yellow';
    }

    else if (pm > 35) {
        level = 'orange';
    }

    else {
        color = 'gray';
    }

    return color;
}

function getLevel(pm) {
    if (pm <= 12) {
        level = 'Good';
    }
    else if (pm > 12 & pm <= 35) {
        level = 'Moderate';
    }

    else if (pm > 35) {
        level = 'Unhealthy';
    }

    else {
        level = 'Unknown';
    }

    return level;
}

setInterval(updateLogger, 5000);

// setInterval(timer, 1000);
// let x = 100;
// function timer() {
//     timerEl = document.getElementById('timer');
//     timerEl.textContent = x;
//     x--;
//     console.log(x);
// }


function updateLogger() {
    for (i=0; i<senIndArr.length; i++) {
        let x = Math.floor(Math.random() * 10)%2;
        let y = statusArr[i];
        console.log(y, x);

        if (y*10+x===11) {
            updateEntry(i);
        }

        else if (y*10+x===10) {
            removeEntry(i);
            updateEntry(i);
        }

        else if (y*10+x===1) {
            updateEntry(i);
            displayEntry(i);
        }
        statusArr[i] = x;
        
    }
    console.log(statusArr);

}

function updateEntry(i) {
    let senInd = senIndArr[i];
    let Url = "https://api.purpleair.com/v1/sensors/"+senInd+"?api_key="+apiKey;
    fetch(Url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let element = document.getElementById(senInd);
            let pm25 = data['sensor']['pm2.5'];
            let color = getColor(pm25);
            let level = getLevel(pm25);
            let pmEl = element.querySelector('.pm');
            pmEl.textContent = pm25;
            let levelEl = element.querySelector('.level');
            levelEl.textContent = level;
            element.style.backgroundColor = color;
        })
        .catch(function(error) {
            console.log(error);
        })

}


function removeEntry(i) {
    let senInd = senIndArr[i];
    let element = document.getElementById(senInd);
    // parentEl.removeChild(element);
    // element.innerHTML = '';
    element.classList.add('hidden');
    // element.remove;

}

function displayEntry(i) {
    let senInd = senIndArr[i];
    let element = document.getElementById(senInd);
    // parentEl.appendChild(element);
    element.classList.remove('hidden');
    // element.remove;

}
