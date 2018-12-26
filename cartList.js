var cart=new ShoppingCart();
console.log(cart);

var cartRoot = document.querySelector('#cartRoot');

function displayOrderList()
{
    // 获取购物车数据
    var cartData=cart.getDataFromLocalSatorge();
    console.log(cartData);
     // 获取购物车订单列表
    var orderList=cartData.orderList;
    console.log(orderList);
    // for(const i in orderList)
    // {
    //     console.log(orderList[i]);
    // }
    // 找订单列表父元素
    let cartContent=document.querySelector('#cartContent');
    let orderExample=document.querySelector('#orderExample');

     // 遍历订单列表
    for(let i=0; i < orderList.length; i++)
    {
        // 当前订单数据
         
        console.log(order);
        // 克隆样本节点形成当前订单节点
        node=orderExample.cloneNode(true);
        // 连接到父元素
        cartContent.appendChild(node);
        // 节点id
        node.id=order.id;
        // 找图像节点
        let imgNode=node.querySelector('[data-name="imgSrc"]');
        imgNode.src='images/'+order.print;
        console.log(imgNode);
        console.log(node);
       

        let selectNode=node.querySelector('[data-operator="checkItem"]');
        selectNode.checked=order.selectStatus;
        console.log(selectNode);

        // 设置订单单价
        let priceNode=node.querySelector('[data-name="price"]');
        priceNode.textContent=order.price;
        console.log(priceNode);

        let titeNode=node.querySelector('[data-name="tite"]');
        titeNode.textContent=order.tite;
        console.log(titeNode);

        // 设置数量
        let qtyNode=node.querySelector('[data-name="qty"]');
        qtyNode.textContent=order.qty;
        console.log(qtyNode);

        // 小计
        let subTotalNode=node.querySelector('[data-name="subTotal"]');
        subTotalNode.textContent=order.price*order.qty.toFixed(2);
        console.log(subTotalNode);

        // 移除当前订单节点到隐藏属性
        node.classList.remove('d-none');

        

        
    } 
    // 克隆一个样本节点
    // 设置一个新id
    // 挂接到父元素
    // 获取所有到数据节点data-name 依次将对应到数据送入节点对应属性
    // 移除新节点到隐藏属性 d-none
    // ｝
}

function displaySelectedTotal()
{ 

    let totalNode = cartRoot.querySelector('[data-operator="totalQty"]');
    totalNode.textContent = cart.getTotalUnits();


    let totalProduct=cartRoot.querySelector('[data-name="totalProduct"]');
    totalProduct.textContent=cart.getSelectedQty();
    console.log(totalProduct);

    let totalPrice=cartRoot.querySelector('[data-name="totalPrice"]');
    totalPrice.textContent=cart.getSelectedAmount().toFixed(2);
    console.log(totalPrice);

}

// 为相关节点注册事件
function regEvent() {
    // 获取清空购物车节点
    let element = cartRoot.querySelector('[data-operator="clearAll"]');
    console.log(element);
    // 注册单击事件触发函数
    element.onclick = clearAllEventFun;

    // 获取删除节点
    let deleteItem=cartRoot.querySelectoAllr('[data-operator="deleteItem"]');
    console.log(deleteItem);
    // 注册单击事件触发函数
    for(const key in deleteItem)
    {
        const deleteItem=deleteItem[key];
        deleteItem.onclick=deleteItemEventFun;
    }
    
}


// 清空事件触发函数
function clearAllEventFun() 
{
    cart.clearCart();
    // 获取订单根节点
    let cartListNode = document.querySelector('#cartContent');
    //保留样本节点
    let ExampleNode = (document.querySelector('#orderExample')).cloneNode(true);
    //清除订单根节点的所有元素
    cartListNode.innerHTML = "";
    //将样本节点挂接回列表根节点
    cartListNode.appendChild(ExampleNode);
    // 更新商品总数据
    displaySelectedTotal();
}

//删除事件触发函数
function deleteItemEventFun(e)
{
    let button=e.target;
}



// 初始化函数
function init() {
    // 显示订单列表
    displayOrderList();
    // 显示总数据
    displaySelectedTotal();
    // 为所有操作节点注册事件
    regEvent();
}

//调用初始化函数
init();











