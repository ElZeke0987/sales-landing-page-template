import Image from "next/image";
interface SelectedMenuProps {
    listToShow: any[];
    testText: string;
    className: string;
}
function ItemInCatalog({item}: {item: any}){
    return (
        <div className="item-card flex flex-col justify-between">
            <div className="size-image">
                <Image src={item.thumbnail_url} alt={item.name} width={250} height={250} className="w-full h-full"/>
            </div>
            <div className="item-info">
                {item.name}
            </div>

        </div>
    )
}


export default function SelectedMenu({listToShow, testText, className}: SelectedMenuProps){

    return (
        <div className={className + " sel-menu flex"}>
            {/*testText*/}
            {listToShow.map((item: any, index: number) => (
                <ItemInCatalog item={item} key={index} />
            ))}
        </div>
    )
}