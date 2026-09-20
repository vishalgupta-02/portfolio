import MainLayout from "../main-layout"

import { getQuotes } from "@/hooks/get-quotes"
import FooterContent from "./footer-content"

export default async function Footer() {
  const quote = await getQuotes()

  return (
    <MainLayout>
      <FooterContent quote={quote} />
    </MainLayout>
  )
}
