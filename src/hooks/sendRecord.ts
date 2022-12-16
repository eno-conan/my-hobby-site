
// データ送信
const sendRecord = async (sendInfo: any, id?: any) => {

    const method = 'POST';
    const body = JSON.stringify(sendInfo);
    const headers = {
        'Accept': 'application/json'
    };
    // 送信
    if (id) {
        const recordId = Number(id);
        // 更新時
        return await fetch(`/api/record/${recordId}`, { method, headers, body })
    } else {
        // 新規登録時
        return await fetch(`/api/record`, { method, headers, body })
    }
}

export default sendRecord;