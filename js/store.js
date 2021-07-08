function onMouseOver(event) {
    const dataId = event.target.dataset.id;
    const bannerElems = [...document.querySelectorAll('.banner')];
    bannerElems.forEach(bannerElem => {
        bannerElem.classList.add('banner-hide');
        bannerElem.classList.remove('banner-show');
    });

    const currentElem = document.getElementById(`banner_${dataId}`);

    if (currentElem) {
        currentElem.classList.remove('banner-hide');
        currentElem.classList.add('banner-show');
    }
}

function onMouseOut() {
    const bannerElems = [...document.querySelectorAll('.banner')];
    bannerElems.forEach(bannerElem => {
        bannerElem.classList.add('banner-hide');
        bannerElem.classList.remove('banner-show');
    });
    const pttElem = document.getElementById(`banner_ptt`);
    pttElem.classList.add('banner-show');
    pttElem.classList.remove('banner-hide');
}

function onClickStoreItem() {
    const mainStoreElem = document.querySelector('.main-store');
    mainStoreElem.classList.add('show-main-store');
}

function closeMainStore() {
    const mainStoreElem = document.querySelector('.main-store');
    mainStoreElem.classList.remove('show-main-store');

    const cartBoxElem = document.getElementById('cart_box');
    cartBoxElem.style.transform = "translateX(0)";

    const paymentBoxElem = document.getElementById('payment_box');
    paymentBoxElem.style.transform = "translateX(0)";
}

function run() {
    // slide store
    const storeItemElems = [...document.querySelectorAll('.store-item')];
    const closeStoreElem = document.querySelector('.close-store');
    
    storeItemElems.forEach(storeItemElem => {
        storeItemElem.addEventListener('mouseover', onMouseOver);
        storeItemElem.addEventListener('mouseout', onMouseOut);
        storeItemElem.addEventListener('click', onClickStoreItem);
    });

    closeStoreElem.addEventListener('click', closeMainStore)
    // end slide store

    // discount
    const useDiscountElem = document.getElementById('use_discount');
    const closeDiscountBoxElem = document.getElementById('close_discount_box');

    useDiscountElem.addEventListener('click', () => {
        const discountBoxElem = document.getElementById('discount_box');
        discountBoxElem.classList.add('discount-box-active');
    });

    closeDiscountBoxElem.addEventListener('click', () => {
        const discountBoxElem = document.getElementById('discount_box');
        discountBoxElem.classList.remove('discount-box-active');
    });

    const useDiscountPopupElem = document.getElementById('use_discount_popup');
    useDiscountPopupElem.addEventListener('click', () => {
        const discountBoxElem = document.getElementById('discount_box');
        discountBoxElem.classList.remove('discount-box-active');
    });
    // end discount

    // payment
    const choosePaymentElem = document.getElementById('choose_payment');
    choosePaymentElem.addEventListener('click', () => {
        const cartBoxElem = document.getElementById('cart_box');
        cartBoxElem.style.transform = "translateX(-100%)";

        const paymentBoxElem = document.getElementById('payment_box');
        paymentBoxElem.style.transform = "translateX(-100%)";
    });

    const btnBackToCartElem = document.getElementById('btn_back_to_cart');
    btnBackToCartElem.addEventListener('click', () => {
        const cartBoxElem = document.getElementById('cart_box');
        cartBoxElem.style.transform = "translateX(0)";

        const paymentBoxElem = document.getElementById('payment_box');
        paymentBoxElem.style.transform = "translateX(0)";
    });

    const selectPaymentElems = [...document.querySelectorAll('.select-payment')];
    const paymentBodyElem = document.querySelector('.payment-body');
    const paymentFooterElem = document.querySelector('.payment-footer');
    selectPaymentElems.forEach(selectPaymentElem => {
        selectPaymentElem.addEventListener('input', event => {
            const payment = event.target.value.toLowerCase();
            if (payment === 'one_pay') {
                createOnePayQrCode();
                paymentFooterElem.innerHTML = '';
            } else {
                paymentBodyElem.innerHTML = '';
                paymentFooterElem.innerHTML = `<button class="main-btn">ຢືນຢັນການສັ່ງຊື້</button>`;
            }
        });
    });
    // end payment

    // store popup
    const btnOpenStorePopup = document.getElementById('btn_open_store_popup');
    btnOpenStorePopup.addEventListener('click', () => {
        const storePopupBoxElem = document.getElementById('store_popup_box');
        storePopupBoxElem.classList.add('discount-box-active');
    });

    const closeStorePopupBoxElem = document.getElementById('close_store_popup_box');
    closeStorePopupBoxElem.addEventListener('click', () => {
        const storePopupBoxElem = document.getElementById('store_popup_box');
        storePopupBoxElem.classList.remove('discount-box-active');
    });

    const storePopupItemElems = [...document.querySelectorAll('ul.store-list-popup > li')];
    storePopupItemElems.forEach(storePopupItemElem => {
        storePopupItemElem.addEventListener('click', () => {
            const storePopupBoxElem = document.getElementById('store_popup_box');
            storePopupBoxElem.classList.remove('discount-box-active');
        });
    });
    // end store popup
}

run();