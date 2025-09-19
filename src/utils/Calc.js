export const totalPrice = (data) => {
    const resType = data.resType;

    let totalPrice = 0;
    if (resType === 'hotel') {
        totalPrice += priceByDogType(data.size, data.checkOut, data.checkOutTime, data.nights);

        if (data.groomingService === 'beauty') {
            totalPrice += priceByGroomingService(data.size, data.type, data.option);
        }
    } else {
        totalPrice += priceByGroomingService(data.size, data.type, data.option);
    }
    return totalPrice.toLocaleString();
};

// 미용
const priceByGroomingService = (size, type, option) => {
    let price = 0;
    switch (size) {
        case '소형견':
            switch (type) {
                case '목욕':
                    price += 20000;
                    break;
                case '부분미용':
                    price += 25000;
                    break;
                case '전체미용':
                    price += 35000;
                    break;
                case '스포팅':
                    price += 55000;
                    break;
                case '가위컷':
                    price += 65000;
                    break;
            }
            break;
        case '중형견':
            switch (type) {
                case '목욕':
                    price += 30000;
                    break;
                case '부분미용':
                    price += 35000;
                    break;
                case '전체미용':
                    price += 45000;
                    break;
                case '스포팅':
                    price += 65000;
                    break;
                case '가위컷':
                    price += 75000;
                    break;
            }
            break;
        case '대형견':
            switch (type) {
                case '목욕':
                    price += 40000;
                    break;
                case '부분미용':
                    price += 55000;
                    break;
                case '전체미용':
                    price += 80000;
                    break;
                case '스포팅':
                    price += 80000;
                    break;
                case '가위컷':
                    price += 90000;
                    break;
            }
            break;
    }

    switch (option) {
        case '얼굴컷 / 발톱 / 귀청소':
            price += 5000;
            break;
        case '엉킴 제거':
            price += 5000;
            break;
        case '발바닥 각질 케어':
            price += 5000;
            break;
        case '눈물 자국 케어':
            price += 5000;
            break;
        case '탄산스파':
            price += 10000;
            break;
        case '선택 안함':
            price += 0;
            break;
        default:
            price += 0;
            break;
    }
    return price;
};

// 호텔 숙박이용
const priceByDogType = (size, checkOut, checkOutTime, nights) => {
    const lateTime = ['09 : 00', '10 : 00', '11 : 00', '12  : 00'];
    let price = 0;
    let addPrice = 0;
    let times = 0;
    let small = 3000;
    let middle = 4500;
    let large = 5500;

    switch (size) {
        case '소형견':
            price = 35000 * nights;

            if (checkOut === 'extend') {
                times = lateTime.indexOf(checkOutTime) + 1;
                addPrice = times * small;
                price += addPrice;
            }
            break;
        case '중형견':
            price = 45000 * nights;
            if (checkOut === 'extend') {
                times = lateTime.indexOf(checkOutTime) + 1;
                addPrice = times * middle;
                price += addPrice;
            }
            break;
        case '대형견':
            price = 55000 * nights;
            if (checkOut === 'extend') {
                times = lateTime.indexOf(checkOutTime) + 1;
                addPrice = times * large;
                price += addPrice;
            }
            break;
    }
    return price;
};
