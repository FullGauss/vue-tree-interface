const checkCanArrayRender = function( checkedArray ){
    if(!Array.isArray(checkedArray) || checkedArray.length ===0){
        return false;
    } else {
        return true;
    }
}

export default checkCanArrayRender