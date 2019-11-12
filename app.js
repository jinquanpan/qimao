const express=require("express");
const mysql=require("mysql");
const cors=require("cors");
const session=require("express-session");
var pool=mysql.createPool({
	host:"127.0.0.1",
	port:3306,
	user:"root",
	password:"",
	database:"sc"
});
var app=express();

app.use(cors({
	origin:["http://127.0.0.1:5050","http://localhost:5050","http://127.0.0.1:8080","http://localhost:8080"],
	credentials:true
}));
app.use(session({
     secret:"128位字符串",//安全字符串
     resave:true,          //请求时更新数据
     saveUninitialized:true  //保存初始数据
    }))
app.use(express.static("public"));
app.listen(5050);
app.get("/userlist",(req,res)=>{
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	

	var sql="select uid,uname from sc_user where uname=? and upwd=?";
	
	pool.query(sql,[$uname,$upwd],(err,result)=>{
	if(err) throw err;
	if(result.length>0){
		var  uid=result[0].uid;
		var  uname=result[0].uname;
		res.send({code:200,msg:"1",uid:uid,uname:uname});
		//console.log(uname)

		

	//console.log(result[0].uid,req.session.uid)
	}

	else{
		
		res.send({code:404,msg:"0"})}
	})
});
app.get("/nav",(req,res)=>{
	
	var sql3="select * from sc_index_nav";
	pool.query(sql3,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
});
app.get("/introduce",(req,res)=>{
	var sql4="select * from sc_index_introduce";
	pool.query(sql4,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
});
app.get("/custlogo",(req,res)=>{
	var sql4="SELECT * FROM `sc_index_custlogo";
	pool.query(sql4,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
});
app.get("/killint",(req,res)=>{
	var sql4="SELECT * FROM `sc_index_killint";
	pool.query(sql4,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
});
app.get("/business",(req,res)=>{
	var sql5="select * from sc_index_business";
	pool.query(sql5,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
});
app.get("/formation",(req,res)=>{
	
	var sql5="select * from sc_analysis_Formation";
	
	pool.query(sql5,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
});
app.get("/analbusi",(req,res)=>{
	var sql5="select * from sc_analysis_business";
	pool.query(sql5,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
});
app.get("/course",(req,res)=>{
	var sql5="select * from sc_analysis_Course";
	pool.query(sql5,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
});
app.get("/busichal",(req,res)=>{
	
	var sql5="select * from sc_finance_busichal";
	pool.query(sql5,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
});
app.get("/solution",(req,res)=>{
	var sql5="select * from sc_finance_Solution";
	pool.query(sql5,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
});
app.get("/userlogin",(req,res)=>{
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	var $phone=req.query.phone;
	var $email=req.query.email;
	var $gender=req.query.gender;
	console.log($email,$uname,$upwd,$phone,$gender)
	var sql1="select * from sc_user where phone=? or email=?";
	var sql2="insert into sc_user set uname=?,upwd=?,phone=?,email=?,gender=?";
	//console.log($uname);
	pool.query(sql1,[$phone,$email],(err,result)=>{
		if(err) throw err;
		
		//console.log(result)
		if(result.length>0){res.send({code:403,msg:3})
			}else{

			pool.query(sql2,[$uname,$upwd,$phone,$email,$gender],(err,result)=>{

				if(err) throw err;
				if(result.affectedRows>0){res.send({code:202,msg:1})}else{res.send({code:404,msg:2})}
			})
		}
	})
})
//http://127.0.0.1:5050/userlist?uname=a&upwd=123
//http://127.0.0.1:8080/userlist?uname=123&upwd=123

app.get("/state",(req,res)=>{
	var sql16="select * from sc_state where uid=?";
	var sql17="update sc_state set frequency=frequency+1 where uid=?"
	var sql18="insert into sc_state set uid=?,frequency=?"
	var obj=req.query.uid;

	//console.log(obj)
	
	pool.query(sql16,[obj],(err,result)=>{
		if(err)throw err;
		if(result.length>0){
			pool.query(sql17,[obj],(err,result)=>{
				if(err) throw err;
				if(result.affectedRows>0){res.send({code:1,msg:"登陆成功"})}else{res.send({code:-2,msg:"登陆失败"})}
			})
		}else{
			pool.query(sql18,[obj,1],(err,result)=>{
				if(err) throw err;
				if(result.affectedRows>0){res.send({code:2,msg:"添加成功"})}else{res.send({code:-1,msg:"添加失败"})}
				
			})
		}
	})
});
//http://127.0.0.1:5050/state?uid=1