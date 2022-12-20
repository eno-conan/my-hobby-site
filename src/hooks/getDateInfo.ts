export const getDateInfo = (dateType: number, target?: any) => {
    const currentDate = new Date();
    // console.log(new Date().toDateString());  //Wed Dec 21 2022
    // console.log(new Date().toISOString()); //2022-12-20T23:28:49.785Z
    // console.log(new Date().toLocaleDateString());//2022/12/21
    // console.log(new Date().toLocaleString());//2022/12/21 8:28:49
    // console.log(new Date().toLocaleTimeString());//8:28:49
    // console.log(new Date().toString());//Wed Dec 21 2022 08:28:49 GMT+0900 (日本標準時)
    // console.log(new Date().toTimeString());//08:28:49 GMT+0900 (日本標準時)
    // console.log(new Date().toUTCString());//Tue, 20 Dec 2022 23:28:49 GMT
    // console.log(new Date().getTimezoneOffset());
    // console.log(new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)));
    // console.log('============================');

    if (dateType === 0 && target) {
        const year = target.getFullYear().toString();
        const month = (target.getMonth() + 1).toString();
        const day = (target.getDate()).toString();
        return year + '/' + month + '/' + day;
    }

    if (dateType === 1) {
        const year = currentDate.getFullYear().toString();
        const month = (currentDate.getMonth() + 1).toString();
        const yearMonth = year + '/' + month;
        return yearMonth;
    } else if (dateType === 2) {
        const year = currentDate.getFullYear().toString();
        const month = (currentDate.getMonth() + 1).toString();
        const day = (currentDate.getDate()).toString();
        const yearMonth = year + '/' + month + '/' + day
        return yearMonth;
    }
    return '2022/01/01';
}