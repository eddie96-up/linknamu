export type LinkItem = {
  /** 클릭 수 집계에 쓰이는 고유 ID (바꾸면 기존 집계와 연결이 끊어집니다) */
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
  links: LinkItem[];
};

// 여기만 수정하면 페이지 내용이 바뀝니다.
export const profile: Profile = {
  name: "김에디",
  bio: "코린이(코인아님)의 이모저모",
  image: "https://placehold.co/150x150/orange/white", // 임시 사진. 실제 사진은 public/ 에 넣고 경로만 바꾸면 됩니다 (예: /me.jpg)
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/eddie96-up" },
    { id: "blog", title: "Blog", url: "https://blog.naver.com/kimm9875" },
  ],
};
