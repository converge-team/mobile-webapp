function query(query, search) {

    const firstSearch = search.indexOf('?'+query);

    let index = firstSearch >= 0 ? firstSearch : search.indexOf('&'+query);

    let start = index + query.length + 2;
    let cut = search.substring(start);
    
    if(cut.indexOf('&') < 0) return cut;

    let symbolArr = [];

    for(let i = 0; i < cut.length; i++) {
        if(cut[i] === '&') {
            symbolArr.push(i)
        }
    }

    const answer = cut.substring(start, symbolArr[0]);

    return answer;
    // let lastIndex = 
}

export default query;