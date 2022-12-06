import React, { useState } from "react";
import { allMemberList } from "../../consts/realtimeSearch";
import { member } from "../../types/realtimeSearchType";
export type MemberList = Array<member>;

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
