const IniScores =  {};

const setIniScores = (obj, key, text, score = 0) => {
	return obj[key] ={
		key: key,
		croseed_out: false,
		score: score,
		text: text,
		className: 'tc fw1'
	};
}

setIniScores(IniScores, "gene_serv", "Generala servida");
setIniScores(IniScores, "gene", "Generala");
setIniScores(IniScores, "poker", "Poker");
setIniScores(IniScores, "full", "Full");
setIniScores(IniScores, "esca", "Escalera", 20);
setIniScores(IniScores, "n6","Nro. 6");
setIniScores(IniScores, "n5","Nro. 5");
setIniScores(IniScores, "n4","Nro. 4");
setIniScores(IniScores, "n3","Nro. 3");
setIniScores(IniScores, "n2","Nro. 2");
setIniScores(IniScores, "n1","Nro. 1");

export default IniScores;
