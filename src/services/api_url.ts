// Khai báo tất cả các API URL

//example
export const API_URL = {
    //---1 SỐ CODE DEMO MẪU KO CẦN XOÁ---
    getDSDemo: () => `/api/getDSDemo`,
    posAPIDemo: () => `/api/posAPIDemo`,
    getDSDemoParam: (params: string) => `/api/getDSDemo?${params}`,
    postFullDemo: () => `http://abc.com/api/postFullDemo`,
    apiDomainNewDemo: (domain: string) => `${domain}/api/apiDomainNew`,
    apiDomainNewDemo2: (domain: string, params: string) => `${domain}/api/apiDomainNew2?${params}`,
    //--------------------------------
    //--Thêm mới ở dưới dòng này--

}