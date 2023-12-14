function maxSetSize(riceBags) {
    // Write your code here
    let n = riceBags.length;
    let newRiceBags = riceBags.sort( function( a, b ){ return b-a} );
    let tempBags    = [];
    let perfectSet  = [];
    
    //console.log( newRiceBags );
    
    if( n >= 1 && n <= 200000 ){
        //Iterate each newRiceBags position.
        for( let i=0; i<n; i++ ){

            if( newRiceBags[i] >= 2 && newRiceBags[i] <= 1000000 ){
                
                if( perfectSet.length > 0 ){ 
                    //console.log( " :::::: IF ");
                    compareWithPS( perfectSet, tempBags );
                    if( tempBags.length > perfectSet.length ){
                        perfectSet = compareTempWithPerfect( tempBags, perfectSet );
                        //console.log( perfectSet );
                    }
                    break;
                }else{
                    //console.log( " :::::: ELSE ");
                    validateIfIsPS( newRiceBags, perfectSet, tempBags, i, n );
                }
                
            }else{
                return -1;
            }
            //console.log( perfectSet );
            //console.log( tempBags );
            
        }
        
        //console.log( " :::::: ");
        console.log( perfectSet );
        //console.log( tempBags );
        return perfectSet.length;
        
    }else{
        return -1;
    }
}

function validateIfIsPS( riceBags, perfectSet, tempBags, i, n ){
    //Each time when is a new riceBags index, the flag is set to 0.
    let coincidences = 0;
    
    //Iterate from the ricebags next position.
    for( let y=i+1; y<n; y++ ){ 

        if( ( riceBags[i] * riceBags[i] ) == riceBags[y] 
            || ( riceBags[y] * riceBags[y] ) == riceBags[i] ){
                                
            if( coincidences == 0 ){
                coincidences++;
                perfectSet.push( riceBags[i] );
            }
                            
            perfectSet.push( riceBags[y] );

        }else{
            tempBags.push( riceBags[y] );
        }
    }
}

function compareWithPS( perfectSet, tempBags ){
    let posBag2Compare = perfectSet.length - 1;
    
    for( let i = 0; i < tempBags.length; i++ ){
        //console.log(  "+++" + tempBags[i] + "+++" );
        //console.log(  "***" +  perfectSet[posBag2Compare] + "***" );
        if( ( tempBags[i] * tempBags[i] ) == perfectSet[posBag2Compare] || 
            ( perfectSet[posBag2Compare] * perfectSet[posBag2Compare] ) == tempBags[i] ){
            perfectSet.push( tempBags[i] );
            tempBags.splice( i, 1 );
        }
    }
}

function compareTempWithPerfect ( tempBags, perfectSet ){

    let perfectSetTemp = [];
    let coincidences = 0;
    
    for( let i=0; i<tempBags.length; i++ ){
        if( tempBags[i] == tempBags[i+1] * tempBags[i+1]  ){
            if( coincidences == 0 ){
                perfectSetTemp.push( tempBags[i] );
                coincidences++;
            }
            
            perfectSetTemp.push( tempBags[i+1] );
        }
    }
    
    if( perfectSetTemp.length > perfectSet.length ){
        tempBags    = perfectSet;
        perfectSet  = perfectSetTemp;
    }
    
    return perfectSet;
}

//riceBags = [ 4, 625, 2, 5, 25, 256, 16 ];
//riceBags = [ 625, 4, 2, 5, 25 ];
//riceBags = [ 4, 2, 5, 625, 25 ];
riceBags = [ 625, 2, 5, 25, 256, 16 ];
console.log( "Size: " + maxSetSize(riceBags) );