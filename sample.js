// var arr=[11,3,55,7,3,0];
// for(let i=0;i<arr.length-1;i++){
//     for(let j=i;j<arr.length;j++){
//         if(arr[i]<arr[j]){
//        var temp=arr[j];
//         arr[j]=arr[i]
//         arr[i]=temp;}
//     }
// }
// console.log(arr)


//finding unique element

const colors = [
    "truegreen", 'green', 'blue', 'yellow', 'red', 'purple', 'green', 'orange', 'blue',
    'pink', 'yellow', 'cyan', 'magenta', 'red', 'purple', 'green', 'orange', 'blue',
    'teal', 'yellow', 'red', 'purple', 'green', 'orange', 'blue', 'red', 'green',
    'blue', 'yellow', 'red', 'purple', 'green', 'orange', 'blue', 'pink', 'yellow',
    'cyan', 'magenta', 'red', 'purple', 'green', 'orange', 'blue', 'teal', 'yellow',
    'red', 'purple', 'green', 'orange', 'blue','red',"maganta"
  ];

  const unique = new Set(colors)

  console.log(unique);

  const nonRepeating = colors.filter((colors1,index,array)=>{

    return array.indexOf(colors1)=== array.lastIndexOf(colors1)
  })
   console.log(nonRepeating);
   console.log(colors.slice(3,5))
   var a=colors.splice(3,4)
   colors.push("abc")
   console.log(colors.splice(3,4))
   console.log(colors)
   console.log(a)
  