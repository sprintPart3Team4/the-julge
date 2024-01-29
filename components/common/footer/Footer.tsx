import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cn = classNames.bind(styles);

export default function Footer() {
    return(
        <div className={cn("borderBox")}>
            <div className={cn("contentBox")}>
                <div className={cn("company")}><p>©codeit - 2023</p></div>
                <div className={cn("customerSupport")}>
                    <p className={cn("privacyPolicy")}>Privacy Policy</p>
                    <p className={cn("faq")}>FAQ</p>
                </div>
                <div className={cn("sns")}>
                    <Link href={"mailto:support@codeit.kr"}><Image src="/images/envelope.svg" width={25} height={25} alt="envelope" /></Link>
                    <Link href={"https://www.facebook.com/"}><Image src="/images/facebook.svg" width={25} height={25} alt="facebook" /></Link>
                    <Link href={"https://www.instagram.com/"}><Image src="/images/instagram.svg" width={25} height={25} alt="instagram" /></Link>
                </div>
            </div>
        </div>
    )
}