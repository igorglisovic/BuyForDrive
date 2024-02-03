import Nav from './components/Nav'
import Provider from './components/Provider'
import './globals.css'
import { LoadingBarProvider } from './store/loading-bar'
import { FiltersContextProvider } from './store/filters'
import { PostCarContextProvider } from './store/post-car'
import { SearchContextProvider } from './store/search-car'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'

export const metadata = {
  title: 'BuyForDrive',
  description: 'BuyForDrive',
  icons: {
    icon: '/assets/bmw.webp',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <PostCarContextProvider>
          <LoadingBarProvider>
            <SearchContextProvider>
              <FiltersContextProvider>
                <Provider>
                  <Nav />
                  <main className="pt-16 min-h-[calc(100vh-340px)]">
                    {children}
                  </main>
                  <Footer />
                  <CookieConsent />
                </Provider>
              </FiltersContextProvider>
            </SearchContextProvider>
          </LoadingBarProvider>
        </PostCarContextProvider>
      </body>
    </html>
  )
}
