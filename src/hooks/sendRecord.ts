
// データ送信
const sendRecord = async (sendInfo: any) => {
    const method = 'POST';
    const body = JSON.stringify(sendInfo);
    const headers = {
        'Accept': 'application/json'
    };
    // 新規の場合：idの値なし
    // 更新の場合：idの値あり
    if (sendInfo.id) {
        const recordId = Number(sendInfo.id);
        // 更新
        return await fetch(`/api/record/${recordId}`, { method, headers, body })
    } else {
        // 新規登録
        return await fetch(`/api/record`, { method, headers, body })
    }
}

export default sendRecord;