export {};

declare global{

    interface UserData {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        type: 'Writer' | 'Editor';
        status: 'Active' | 'Inactive';
    }

    interface ArticleData {
        id: string;
        image: string;
        title: string;
        link: string;
        date: Date;
        content: string;
        status: 'For Edit' | 'Published';
        writer: UserData;
        editor: UserData | null;
        company: CompanyData;
    }

    interface CompanyData {
        logo: string,
        name: string,
        status: "Active" | "Inactive"
    }

    interface UserState {
        data: UserData | null,
        isAuthenticated: Boolean
    }
    
    type UserAction = {
      type: string
      payload?: UserData | null
    }
      
    type UserDispatch = (args: UserAction) => UserAction

    interface state {
        user: UserState
    }
}