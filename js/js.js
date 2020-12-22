var data=[{
    name:"短袖",
    price:40,
    num:1,
    totle:40
},{
    name:"短袖",
    price:40,
    num:1,
    totle:40
},{
    name:"短袖",
    price:40,
    num:1,
    totle:40
},{
    name:"短袖",
    price:40,
    num:1,
    totle:40
},
]//虚拟后台数据
var block=document.querySelector(".block");//获取大盒子位置，为的就是想让虚拟数据显示到大盒子位置
var allck=document.getElementById("allck")
show();//执行show方法
function show(){
    //循环方法 确定几行
    for (var i = 0; i <data.length ; i++) {
        //创建行元素  为什么要创建行元素---因为想让取出的资源成行显示
        var h_list=document.createElement("div");
        //给行元素设置class类选择器
        h_list.setAttribute("class","h_list");
        //创建放置选择框的div
        var datacheck =document.createElement("div");
        //给每行创建选择框
        var check=document.createElement("input");
        check.type="checkbox";
        check.index=i;//给选择框一个索引，点击变色用
        check.className="ck";
        check.addEventListener("click",ckcolor);
        //给选择框放到放置选择框的div
        datacheck.appendChild(check);
        //给放置选择框的div放到行元素
        h_list.appendChild(datacheck);
        //选择框完事了 要遍历出来数据放到行元素里了
        for (var k in data[i]) {
            //给计数行添加+、-按钮 所以要一个判断
            if(k=="num"){
                //num行添加div
                var numall=document.createElement("div");
                //添加按钮
                var left=document.createElement("button");
                left.innerHTML="-";
                left.index=i;
                left.className="left";
                left.addEventListener("click",leftbtn);
                //添加计数框
                var txt=document.createElement("label");
                txt.innerHTML="1";
                txt.className="txt";
                //添加按钮
                var right=document.createElement("button");
                right.innerHTML="+";
                right.index=i;
                right.className="right";
                right.addEventListener("click",rightbtn);
                //依次向上添加
                numall.appendChild(left);
                numall.appendChild(txt);
                numall.appendChild(right);
                h_list.appendChild(numall);
            }else{
            //创建放置数据的div
            var datalist=document.createElement("div");
            //给每个div显示字
            datalist.innerHTML=data[i][k];
            //给每个div设置class类选择器
            datalist.className=k;
            h_list.appendChild(datalist);
            }
        }
        //放置删除按钮的div
        var remove=document.createElement("div");
        //创建删除的按钮
        var btn=document.createElement("button");
        btn.innerHTML="删除";
        btn.className="delete";
        btn.index=i;
        btn.addEventListener("click",deletebtn);
        //依次往上加
        remove.appendChild(btn)
        h_list.appendChild(remove);
        block.appendChild(h_list);
    }
}
//给全选框设置点击全选事件
allck.onclick=function (){
    //获取那一组选择框
    var ck=document.getElementsByClassName("ck");
    //获取行元素，点击变色用
    var hlist=document.getElementsByClassName("h_list");
    //循环遍历出选择框状态
    for (var i=0;i<ck.length;i++){
        //选中，未选中切换
        ck[i].checked=!ck[i].checked;
        //调用方法变色
        ckallcolor(ck[i].checked,hlist,i);
    }
}
//选择框 点击变色
function ckcolor() {
    //同样获取行元素
    var hlist=document.getElementsByClassName("h_list");
    if(this.checked){
        hlist[this.index].style.backgroundColor="red";
    }
    else {
        hlist[this.index].style.backgroundColor="white";
    }
    allprice()
}
//全选框选中变色   需要传递选择框状态，行元素，下标
function ckallcolor(isck,obj,index){
    if(isck){
        obj[index].style.backgroundColor="red";
    }else {
        obj[index].style.backgroundColor="white";
    }
    allprice()
}
//设置按钮事件
function leftbtn() {
    var txt = document.getElementsByClassName("txt");
    var num = txt[this.index].innerHTML;
    num--;
    if (num <= 1) {
        num = 1;
    }
    txt[this.index].innerHTML = num;
    s_price(this.index,num);
    allprice()
}
function rightbtn() {
    var txt = document.getElementsByClassName("txt");
    var num = txt[this.index].innerHTML;
    num++;
    txt[this.index].innerHTML = num;
    s_price(this.index,num);
    allprice()
}
//小计
function s_price(index,num){
    //获取单价
    var price=document.getElementsByClassName("price");
    //获取小计
    var totle=document.getElementsByClassName("totle");
    //小计=单价乘数量
    totle[index].innerHTML=price[index].innerHTML*num;
}
//算总账
function allprice(){
    //需要小计
    var totle=document.getElementsByClassName("totle");
    //需要选择框算钱
    var ck=document.getElementsByClassName("ck");
    //需要定义总价初始值
    var allprice=0;
    //遍历 出选择框
    for (var i = 0; i <ck.length ; i++) {
        //选择了 就算总账
        if(ck[i].checked){
            allprice+=parseFloat(totle[i].innerHTML);
        }
        console.log(allprice);//总账在控制台显示一下，，，，懒
    }
}
//删除按钮添加事件
function deletebtn() {
    //删除意味着所有用到索引的都要更新一下
    var hlist = document.getElementsByClassName("h_list");
    var checkbox = document.getElementsByClassName("ck");
    var leftbtn = document.getElementsByClassName("left");
    var deletebtn = document.getElementsByClassName("delete");
    var rightbtn = document.getElementsByClassName("right");
    //删除
    hlist[this.index].remove();
    //重新遍历下标索引 重新赋值
    for (var i = 0; i < hlist.length; i++) {
        checkbox[i].index = i;
        leftbtn[i].index = i;
        rightbtn[i].index = i;
        deletebtn[i].index = i;
    }
    //重新算总账
    allprice();
}