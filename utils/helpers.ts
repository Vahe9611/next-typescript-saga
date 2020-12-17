export const groupByMultiple = ( array: Array<any> , func: Function ) => {
  const compare = (a: any, b: any) => {
    const keyA = JSON.stringify( func(a) );
    const keyB = JSON.stringify( func(b) );
    return (keyA > keyB) ? 1 : (keyA < keyB) ? -1 : 0
  }
  array.sort(compare)

  const groups: any = {};

  array.forEach( ( o: any ) => {
    const group = JSON.stringify( func(o) );
    const existingGroup = Object.keys(groups).find(e => e === group);
    groups[group] = existingGroup === undefined ? [] : [...groups[group]] ;
    groups[group].push( o );  
  });
  
  return Object.keys(groups).map( group => groups[group])
}