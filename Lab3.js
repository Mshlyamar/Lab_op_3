let fs = require('fs');
let s = fs.readFileSync('premier_league.csv', 'ascii');
let strArray = [], arrArray = [], resPoints = [], strFinal = '', arr = [], strEnd = '', are = [];
strArray = s.split('\n');
strArray.pop();
for (let i = 0; i <= Number(strArray[0]) + 1; i++) {
    arr[i] = '';
}
for(let i = 1; i < Number(strArray[0])+1; i++){
   let str = '', l = 0;
   for (let j = 0; j < strArray[i].length; j++){
       if (strArray[i][j] == '\"') {l++}
       if (l == 1) {arr[i-1] += strArray[i][j]}
       if (l == 2) {
	   arr[i-1] += '\"';
	   l++;
	   continue;
       }
       if (l > 3) {
	   strEnd += strArray[i][j]};
       if (l == 3) {l++}
   }
   are.push(strEnd.split(','));
   strEnd = '';
}

for (let i = 1; i < Number(strArray[0])+1; i++) {
    if (arr[i-1].length == 0) {
        arrArray[i-1] = strArray[i].split(',');
    } else {
 	let k = are[i-1];
	console.log(k)
	arrArray[i-1] = [arr[i-1]];
        for (let j = 0; j < k.length; j++) {
	    arrArray[i-1].push(k[j]); 
	} 
    }
}
for (let i = 0; i < Number(strArray[0]); i++) {
    resPoints[i] = 0;
}
for (let i = 0; i < arrArray.length; i++) {
    for (let j = 1; j < arrArray[i].length; j++) {
        let positive = Number(arrArray[i][j][0]), negative = Number(arrArray[i][j][2]);
	if (positive > negative) {
		resPoints[i] += 3;
	} else if (positive == negative) {resPoints[i]++}
    }
}
for (let i = 0; i < arrArray.length; i++) {
    strFinal += arrArray[i][0] + ',' + resPoints[i] + '\r\n';
}

fs.writeFileSync('result.csv', strFinal, 'ascii');
