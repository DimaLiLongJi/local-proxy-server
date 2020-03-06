function arrMinNum(arr){
    let minNum = Infinity, index = -1,minVul = "";
    for (let i = 0; i < arr.length; i++) {
        if (typeof(arr[i]) == "string") {
            if (arr[i].charCodeAt()<minNum) {
                minNum = arr[i].charCodeAt();
                minVul = arr[i];
                index = i;
            }
        }else {
            if (arr[i]<minNum) {
                minNum = arr[i];
                minVul = arr[i]
                index = i;
            }
        }
    };
    return {"minNum":minVul,"index":index};
}
export function arrSortMinToMax(arr){
    let arrNew = [];
    let arrOld = arr.concat();
    for (let i = 0; i < arr.length; i++) {
        arrNew.push(arrMinNum(arrOld).minNum);
        arrOld.splice(arrMinNum(arrOld).index,1);
    };
    return (arrNew);
}
function arrMaxNum(arr){
    let maxNum = -Infinity, index = -1,maxVul = "";
    for (let i = 0; i < arr.length; i++) {
        if (typeof(arr[i]) == "string") {
            if (arr[i].charCodeAt()>maxNum) {
                maxNum = arr[i].charCodeAt();
                maxVul = arr[i];
                index = i;
            }
        }else {
            if (arr[i]>maxNum) {
                maxNum = arr[i];
                maxVul = arr[i];
                index = i;
            }
        }
    }
    return {"maxNum":maxVul,"index":index};
}
export function arrSortMaxToMin(arr){
    let arrNew = [];
    let arrOld = arr.slice(0);
    for (let i = 0; i < arr.length; i++) {
        arrNew.push(arrMaxNum(arrOld).maxNum);
        arrOld.splice(arrMaxNum(arrOld).index,1);
    }
    return (arrNew);
}
