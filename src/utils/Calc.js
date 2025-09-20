const lateTime = ['09 : 00', '10 : 00', '11 : 00', '12  : 00'];
// prettier-ignore
const optionPrice = {
    '얼굴컷 / 발톱 / 귀청소': 5000,
    '엉킴 제거': 5000,
    '발바닥 각질 케어': 5000,
    '눈물 자국 케어': 5000,
    '선택 안함': 0,
    '탄산스파': 10000,
};

// 한번에 계산
export const TotalPrice = (data) => {
    const resType = data.resType;

    let totalPrice = 0;
    if (resType === 'hotel') {
        // 숙박비용 계산
        totalPrice += priceByDogType(data.size, data.checkOut, data.checkOutTime, data.nights);
        if (data.groomingService === 'beauty') {
            // 기본 미용비
            totalPrice += priceByGroomingService(data.size, data.type);
            // 추가 옵션비
            totalPrice += addPriceByGroomingOption(data.option);
        }
    } else {
        // 미용비용만
        totalPrice += priceByGroomingService(data.size, data.type);
        // 추가 옵션비
        totalPrice += addPriceByGroomingOption(data.option);
    }
    return totalPrice.toLocaleString();
};

// 미용 옵션 요금
export const addPriceByGroomingOption = (option) => {
    return optionPrice[option];
};

// 미용 기본요금
export const priceByGroomingService = (size, type, option) => {
    const base = {
        소형견: {
            목욕: 20000,
            '부분 미용': 25000,
            '전체 미용': 35000,
            스포팅: 55000,
            가위컷: 65000,
        },
        중형견: {
            목욕: 30000,
            '부분 미용': 35000,
            '전체 미용': 45000,
            스포팅: 65000,
            가위컷: 75000,
        },
        대형견: {
            목욕: 40000,
            '부분 미용': 55000,
            '전체 미용': 80000,
            스포팅: 80000,
            가위컷: 90000,
        },
    };

    const basePrice = Number(base[size]?.[type] ?? 0);

    return basePrice;
};
// 호텔 숙박이용
const priceByDogType = (size, checkOut, checkOutTime, nights) => {
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

// 호텔 기본 요금
export const HotelBasicPrice = (size, nights) => {
    let price = 0;
    switch (size) {
        case '소형견':
            price = 35000 * nights;
            break;
        case '중형견':
            price = 45000 * nights;
            break;
        case '대형견':
            price = 55000 * nights;
            break;
    }
    return price;
};

export const HotelLateCheckOut = (size, checkOutTime) => {
    let addPrice = 0;
    let small = 3000;
    let middle = 4500;
    let large = 5500;
    let times = lateTime.indexOf(checkOutTime) + 1;
    switch (size) {
        case '소형견':
            addPrice = times * small;
            break;
        case '중형견':
            addPrice = times * middle;
            break;
        case '대형견':
            addPrice = times * large;
            break;
    }
    return addPrice;
};
