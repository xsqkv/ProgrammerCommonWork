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
                            alert("Дядя Валера: Ладно, если всё работает тогда я думаю что всё впорядке.");
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

    document.write("<img style=\"zIndex:0; background-image:url('imgs/Level2/kali.jpg'); background-repeat: no-repeat; background-attachment: fixed; background-size: cover;"
    +"position:absolute; top:-1; left:-1; width:100%; height:100%\"></img>");

    document.write(
    "<textarea id=term style='zIndex:1; overflow-x:hidden; color:#7fff7f; background-color:black; position:absolute; top:-1; left:-1; height:100%; width:100%; opacity: 90%'>"
    +"[cloudCorp@CalyLunix ~]$> "
    +"</textarea>");

    let term = document.getElementById("term");

    term.focus();

    term.addEventListener('input',function (event) 
    {
        console.log(event.target.value);
    });
}

Intro();

Level1();