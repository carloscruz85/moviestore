 const sendLoginData = (data) => {
    console.log(data, 'in action creators');
 	return{
 		type : 'SENDLOGINDATA',
 		data : data
 	}
 };

 export { sendLoginData };
