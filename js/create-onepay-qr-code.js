function makeuuid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

function createOnePayQrCode() {
    const mcid = "mch5c2f0404102fb"; // merchant id
    const shopcode = "SVN@PHT20202"; // shop code
    const uuid = makeuuid(6); // transaction id (please define as unique key)
    const invoiceid = null; // transaction id (please define as unique key)
    const onePay = new OnePay(mcid); // create new OnePay instance
    onePay.debug = true; // enable OnPay debug(Please looking on console log)

    /* generate new QR code via onepay.js */
    onePay.getCode({
        transactionid: uuid, // please define as unique key
        invoiceid: invoiceid, // a invoice ID can pay many times OR have many transaction ID
        terminalid: null, // terminal ID (in case have many terminals, POS devices or etc...)
        amount: 1, // invoice amount
        description: 'PTT VCL', // must define as English text
    }, function (code) {
        const paymentBodyElem = document.querySelector('.payment-body');
        paymentBodyElem.innerHTML = `
            <div class="line"></div>
            <div style="font-weight: 600;margin: 10px 0 20px">
                ກະລຸນາສະແກນ QR CODE ດ້ວຍ BCEL ONEPAY ເພື່ອທຳການຊຳລະເງິນ 
            </div>
        `;

        const imgElem = document.createElement('img');
        imgElem.setAttribute('src', `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${code}&choe=UTF-8`);
        imgElem.style.border = "3px solid #bb1111";

        paymentBodyElem.appendChild(imgElem);
    });

    /* define subscribe parameter(s) */
    const subParams = {
        uuid: uuid, // please specified uuid if would like to receive callback data only the transaction (for front-end subscribe)
        shopcode: null, // please specified shopcode if would link to receive all callback for the merchant ID (for back-end subscribe)
        tid: null // please specified tid(terminal ID) and shopcode if would link to receive all callback for the merchant ID and specific terminal (for terminal subscribe)
    };
    /* subscribe to receiving OnePay callback*/
    onePay.subscribe(subParams, function (res) {
        if (res.uuid === uuid) {
            const paymentBoxElem = document.getElementById('payment_box');
            paymentBoxElem.classList.add('creating-order');
            setTimeout(() => {
                console.log('created order');
                paymentBoxElem.classList.remove('creating-order');
                paymentBoxElem.innerHTML = `
                    <div class="success-order">
                        <div class="success-img">
                            <img src="img/logo.png">
                        </div>
                        ການສັ່ງຊື້ສຳເລັດ
                    </div>
                `;
            }, 2000);
        }
        console.log('fail');
        console.log(res);
    });
}