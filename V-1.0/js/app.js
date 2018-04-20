var muniArr = [
    //Bezirk Arbon, 11 Gemeinden
    [4436, "Romanshorn", 10000],
    [4451, "Uttwil", 10000],
    [4426, "Kesswil", 10000],
    [4441, "Salmsach", 10000],
    [4411, "Egnach", 10000],
    [4401, "Arbon", 10000],
    [4421, "Horn", 10000],
    [4431, "Roggwil", 10000],
    [4461, "Amriswil", 10000],
    [4406, "Dozwil", 10000],
    [4416, "Hefenhofen", 10000],
    [4446, "Sommeri", 10000],

    //Bezirk Kreuzlingen, 13 Gemeinden
    [4656, "Güttingen", 5000],
    [4641, "Altnau", 4000],
    [4691, "Münsterlingen", 3000],
    [4643, "Bottighofen", 2000],
    [4671, "Kreuzlingen", 1000],
    [4681, "Langrickenbach", 8000],
    [4683, "Lengwil", 7000],
    [4666, "Kemmental", 6000],
    [4696, "Tägerwilen", 5000],
    [4651, "Gottlieben", 4000],
    [4646, "Ermatingen", 3000],
    [4851, "Salenstein", 2000],
    [4846, "Raperswilen", 1000],
    [4701, "Wäldi", 8000],

    //Bezirk Weinfelden, 17 Gemeinden
    [4486, "Hauptwilen-Gottshaus", 100],
    [4511, "Zihlschlacht-Sitterdorf", 100],
    [4471, "Bischofszell", 100],
    [4495, "Hohen-Tannen", 100],
    [4476, "Erlen", 10000],
    [4501, "Kradolf-Schönenberg", 100],
    [4506, "Sulgen", 100],
    [4911, "Bürglen", 100],
    [4901, "Birwinken", 100],
    [4891, "Berg", 100],
    [4791, "Wuppenau", 100],
    [4756, "Schönholzerswilen", 100],
    [4921, "Bussnang", 100],
    [4946, "Weinfelden", 100],
    [4941, "Märstetten", 100],
    [4711, "Affeltrangen", 100],
    [4881, "Amlikon-Bissegg", 100],
    [4951, "Wigoltingen", 100],

    //Bezirk Frauenfeld, 22 Gemeinden
    [4606, "Stettfurt", 10],
    [4591, "Matzingen", 10],
    [4611, "Thundorf", 10],
    [4566, "Frauenfeld", 10],
    [4571, "Gachnang", 10],
    [4590, "Hüttlingen", 10],
    [4561, "Felben-Wellhausen", 10],
    [4831, "Müllheim", 10],
    [4841, "Pfyn", 10],
    [4621, "Warth-Weiningen", 10],
    [4616, "Uessingen-Buch", 10],
    [4601, "Neunforn", 10],
    [4816, "Homburg", 10],
    [4811, "Herdern", 10],
    [4821, "Hüttwilen", 10],
    [4801, "Berlingen", 10],
    [4864, "Steckborn", 10],
    [4826, "Mammern", 10],
    [4806, "Eschenz", 10],
    [4871, "Wagenhausen", 10],
    [4545, "Diessenhofen", 10],
    [4536, "Basadingen-Schlattingen", 10],
    [4546, "Schlatt (TG)", 10],

    //Bezirk Münchwilen (TG), 12 Gemeinden
    [4726, "Fischingen", 1],
    [4751, "Rickenbach (TG)", 1],
    [4786, "Wilen (TG)", 1],
    [4761, "Sirnach", 1],
    [4724, "Eschlikon", 1],
    [4721, "Bichelsee-Balterswil (Bi.)", 1],
    [4746, "Münchwilen (TG)", 1],
    [4781, "Wängi", 1],
    [4551, "Aadorf", 1],
    [4723, "Braunau", 1],
    [4776, "Tobel-Tägerschen", 1],
    [4716, "Bettwiesen", 1],
    [4741, "Lommis", 1]
];

var color = [
    [1, "#f9d9cc", "#cffae3"],
    [2, "#f6c7b2", "#b7f8d6"],
    [3, "#f3b499", "#9ff6c8"],
    [4, "#f1a27f", "#87f4bb"],
    [5, "#ee8f66", "#6ff2ad"],
    [6, "#eb7c4c", "#57f09f"],
    [7, "#e86a32", "#3fee92"],
    [8, "#e55719", "#27ec84"],
    [9, "#e34500", "#10ea77"],
    [10, "#cc3e00", "#0ed26b"],
    [11, "#b53700", "#0cbb5f"]
];

var btnP = null;

var max = 0;
for (i = 0; i < muniArr.length; i++) {
    if (max < muniArr[i][2]) {
        max = muniArr[i][2];
    }
}

init();

$("button").click(function () {
    switch (this.id) {
        case "btn1":
            $('#graph').empty();
            btnP = this.id;
            init();
            break;
        case "btn2":
            $('#graph').empty();
            btnP = this.id;
            init();
            break;
        case "btn3":
            $('#graph').empty();
            btnP = this.id;
            init();
            break;
        case "btn4":
            $('#graph').empty();
            btnP = this.id;
            init();
            break;
        case "btn5":
            $('#graph').empty();
            btnP = this.id;
            init();
            break;
        default:
            $('#graph').empty();
            btnP = null;
            init();
            break;
    }
});
