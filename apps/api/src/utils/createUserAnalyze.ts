import type {
  AnalyzeUserStatItemType,
  ActiveUserAnalysisItemType,
  TopUsersByContributionItemType,
  TopUsersByPostCountItemType,
  TopUsersByCommentCountItemType,
  UserRoleDistributionItemType,
  UserStatusDistributionItemType,
  InactiveUsersListItemType,
  UserGrowthRateItemType,
  UserRetentionRateItemType
} from '@nihilog/schemas';

export class CreateUserAnalyze {
  // 사용자 분석 통계 예시 데이터
  static createUserAnalyzeExample(): AnalyzeUserStatItemType {
    return {
      dateStart: '2024-01-01T00:00:00Z',
      dateEnd: '2024-01-31T23:59:59Z',
      newUserCount: 45,
      deleteUserCount: 3,
      activeUserCount: 142,
      loginCount: 1250,
      postWriteCount: 89,
      commentWriteCount: 234,
      bookmarkAddCount: 567,
      tagSubscribeCount: 123,
      categorySubscribeCount: 78,
    };
  }

  // 활성 사용자 분석 예시 데이터
  static createActiveUserAnalysisExample(): ActiveUserAnalysisItemType[] {
    return [
      {
        period: '7일',
        activeUserCount: 45,
        totalUserCount: 142,
        activeUserRatio: 0.3169,
      },
      {
        period: '30일',
        activeUserCount: 89,
        totalUserCount: 142,
        activeUserRatio: 0.6268,
      },
    ];
  }

  // 사용자별 기여도 TOP N 예시 데이터
  static createTopUsersByContributionExample(): TopUsersByContributionItemType[] {
    return [
      {
        userNo: 1,
        userName: 'admin',
        emailAddress: 'admin@example.com',
        contributionIndex: 1250,
        postCount: 45,
        commentCount: 89,
        bookmarkCount: 156,
        lastActivityDate: '2024-01-30T15:30:00Z',
      },
      {
        userNo: 2,
        userName: 'developer',
        emailAddress: 'dev@example.com',
        contributionIndex: 890,
        postCount: 23,
        commentCount: 67,
        bookmarkCount: 98,
        lastActivityDate: '2024-01-29T10:15:00Z',
      },
      {
        userNo: 3,
        userName: 'writer',
        emailAddress: 'writer@example.com',
        contributionIndex: 567,
        postCount: 34,
        commentCount: 45,
        bookmarkCount: 78,
        lastActivityDate: '2024-01-28T14:20:00Z',
      },
    ];
  }

  // 사용자별 포스트 작성 수 TOP N 예시 데이터
  static createTopUsersByPostCountExample(): TopUsersByPostCountItemType[] {
    return [
      {
        userNo: 1,
        userName: 'admin',
        emailAddress: 'admin@example.com',
        postCount: 45,
        lastPostDate: '2024-01-30T15:30:00Z',
      },
      {
        userNo: 3,
        userName: 'writer',
        emailAddress: 'writer@example.com',
        postCount: 34,
        lastPostDate: '2024-01-28T14:20:00Z',
      },
      {
        userNo: 2,
        userName: 'developer',
        emailAddress: 'dev@example.com',
        postCount: 23,
        lastPostDate: '2024-01-29T10:15:00Z',
      },
    ];
  }

  // 사용자별 댓글 작성 수 TOP N 예시 데이터
  static createTopUsersByCommentCountExample(): TopUsersByCommentCountItemType[] {
    return [
      {
        userNo: 1,
        userName: 'admin',
        emailAddress: 'admin@example.com',
        commentCount: 89,
        lastCommentDate: '2024-01-30T15:30:00Z',
      },
      {
        userNo: 2,
        userName: 'developer',
        emailAddress: 'dev@example.com',
        commentCount: 67,
        lastCommentDate: '2024-01-29T10:15:00Z',
      },
      {
        userNo: 4,
        userName: 'commenter',
        emailAddress: 'commenter@example.com',
        commentCount: 45,
        lastCommentDate: '2024-01-27T09:45:00Z',
      },
    ];
  }

  // 역할별 사용자 분포 예시 데이터
  static createUserRoleDistributionExample(): UserRoleDistributionItemType[] {
    return [
      {
        role: 'USER',
        count: 135,
        ratio: 0.9507,
      },
      {
        role: 'ADMIN',
        count: 7,
        ratio: 0.0493,
      },
    ];
  }

  // 상태별 사용자 분포 예시 데이터
  static createUserStatusDistributionExample(): UserStatusDistributionItemType[] {
    return [
      {
        status: 'ACTIVE',
        count: 142,
        ratio: 0.9507,
      },
      {
        status: 'INACTIVE',
        count: 5,
        ratio: 0.0336,
      },
      {
        status: 'DELETED',
        count: 2,
        ratio: 0.0157,
      },
    ];
  }

  // 비활성 사용자 목록 예시 데이터
  static createInactiveUsersListExample(): InactiveUsersListItemType[] {
    return [
      {
        userNo: 5,
        userName: 'inactive_user1',
        emailAddress: 'inactive1@example.com',
        lastLoginDate: '2024-01-15T10:30:00Z',
        daysSinceLastLogin: 15,
      },
      {
        userNo: 6,
        userName: 'inactive_user2',
        emailAddress: 'inactive2@example.com',
        lastLoginDate: '2024-01-10T14:20:00Z',
        daysSinceLastLogin: 20,
      },
      {
        userNo: 7,
        userName: 'inactive_user3',
        emailAddress: 'inactive3@example.com',
        lastLoginDate: '2024-01-05T09:15:00Z',
        daysSinceLastLogin: 25,
      },
    ];
  }

  // 사용자 성장률 예시 데이터
  static createUserGrowthRateExample(): UserGrowthRateItemType[] {
    return [
      {
        dateStart: '2024-01-01T00:00:00Z',
        dateEnd: '2024-01-31T23:59:59Z',
        growthRate: 0.125,
        previousUserCount: 120,
        currentUserCount: 135,
      },
    ];
  }

  // 사용자 유지율 예시 데이터
  static createUserRetentionRateExample(): UserRetentionRateItemType[] {
    return [
      {
        period: '1개월',
        retentionRate: 0.8500,
        totalSignups: 50,
        activeUsers: 42,
      },
      {
        period: '3개월',
        retentionRate: 0.7200,
        totalSignups: 100,
        activeUsers: 72,
      },
      {
        period: '6개월',
        retentionRate: 0.6500,
        totalSignups: 150,
        activeUsers: 97,
      },
    ];
  }
}
