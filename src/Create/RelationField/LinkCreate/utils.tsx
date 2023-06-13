/* eslint-disable no-prototype-builtins */
export const isObjectEquals = function(o1: Record<any, any>, o2: Record<any, any>){
    for(const p in o1){
        if(o1.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    for(const p in o2){
        if(o2.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    return true;
};