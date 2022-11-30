import React, { useState } from "react";

type member = {
    name: string;
    country: string;
    food: string;
};

type MemberList = Array<member>;

const allMemberList = [
    {
        name: "太郎",
        country: "Japan",
        food: "焼肉"
    },
    {
        name: "花子",
        country: "Japan",
        food: "ケーキ"
    },
    {
        name: "リチャード",
        country: "Canada",
        food: "ステーキ"
    },
    {
        name: "マイケル",
        country: "USA",
        food: "ハンバーガー"
    }
];
const RealTimeSearch = () => {
    const [inputValue, setInputValue] = useState("");
    const [memberList, setMemberList] = useState<MemberList>(allMemberList);

    const search = (value: string) => {
        if (value !== "") {
            const filteredList = allMemberList.filter((member: member) =>
                Object.values(member).some(
                    (item: string) =>
                        item?.toUpperCase().indexOf(value.trim().toUpperCase()) !== -1
                )
            );
            setMemberList(filteredList);
            return;
        }

        setMemberList(allMemberList);
        return;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        search(e.target.value);
    };

    return (
        <div className="App">
            <h1>メンバーリスト</h1>
            <div>
                <span style={{ marginRight: "5px" }}>検索フォーム</span>
                <input type="text" value={inputValue} onChange={handleChange} />
            </div>
            <ul>
                {memberList.map((member, index) => {
                    return (
                        <li key={index}>
                            {member.name} / {member.country} / {member.food}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default RealTimeSearch
