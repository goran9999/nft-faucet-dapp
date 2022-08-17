export type TokenVesting = {
  version: "0.1.0";
  name: "token_vesting";
  instructions: [
    {
      name: "initializeVestmet";
      accounts: [
        {
          name: "sourceTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vestor";
          isMut: true;
          isSigner: true;
        },
        {
          name: "consumer";
          isMut: false;
          isSigner: false;
        },
        {
          name: "vestmentMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "vestmentData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vestedTokens";
          isMut: true;
          isSigner: false;
        },
        {
          name: "solTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "releaseAmount";
          type: "u64";
        },
        {
          name: "vestmentStart";
          type: "i64";
        },
        {
          name: "vestmentEnd";
          type: "i64";
        },
        {
          name: "releasePeriod";
          type: "i64";
        },
        {
          name: "cliffStart";
          type: {
            option: "i64";
          };
        },
        {
          name: "cliffPercentage";
          type: {
            option: "u64";
          };
        }
      ];
    },
    {
      name: "claimVestedTokens";
      accounts: [
        {
          name: "vestmentData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vestor";
          isMut: false;
          isSigner: false;
        },
        {
          name: "consumer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "vestmentMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "vestedTokens";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destinationTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "solTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "cancelVestment";
      accounts: [
        {
          name: "vestmentData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vestmentMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "vestedTokens";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sourceTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "vestor";
          isMut: true;
          isSigner: false;
        },
        {
          name: "solTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgam";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "initializeEscrow";
      accounts: [
        {
          name: "escrowData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "offeredMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "escrowInitializer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "wantedMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "sourceTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrowTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "offeredAmount";
          type: "u64";
        },
        {
          name: "wantedAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "acceptEscrowOffer";
      accounts: [
        {
          name: "escrowData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "offeredMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "wantedMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "escrowTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "initializerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "acceptorTokens";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrowInitializer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "acceptor";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "vestNfts";
      accounts: [
        {
          name: "nftVestingData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vestedNftsOwner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftVestor";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "dedicatedTakers";
          type: {
            vec: "publicKey";
          };
        },
        {
          name: "nftAmount";
          type: "u32";
        },
        {
          name: "collectionAddress";
          type: {
            option: "publicKey";
          };
        },
        {
          name: "cliffDates";
          type: {
            vec: {
              option: "i64";
            };
          };
        }
      ];
    },
    {
      name: "claimVestedNft";
      accounts: [
        {
          name: "nftVestingData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vestedNftsOwner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftVestmentRecord";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "nftVestor";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vestedTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftConsumer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "destinationTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "mintNftCollection";
      accounts: [
        {
          name: "nftCollectionData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftAuthority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "collectionAddress";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "metadataProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "nftMetadataData";
          type: {
            vec: {
              defined: "NftMetadataData";
            };
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "escrowData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "escrowInitializer";
            type: "publicKey";
          },
          {
            name: "sourceTokenAccount";
            type: "publicKey";
          },
          {
            name: "offeredAmount";
            type: "u64";
          },
          {
            name: "wantedAmount";
            type: "u64";
          },
          {
            name: "offeredMint";
            type: "publicKey";
          },
          {
            name: "wantedMint";
            type: "publicKey";
          },
          {
            name: "escrowTokenAccount";
            type: "publicKey";
          },
          {
            name: "escrowInitializedAt";
            type: "i64";
          },
          {
            name: "offerStatus";
            type: {
              defined: "OfferStatus";
            };
          }
        ];
      };
    },
    {
      name: "nftCollectionData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "collectionAuthority";
            type: "publicKey";
          },
          {
            name: "collectionAddress";
            type: "publicKey";
          },
          {
            name: "mintTimestamp";
            type: "i64";
          },
          {
            name: "numberOfNfts";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "nftVestingData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "nftVestmentCreator";
            type: "publicKey";
          },
          {
            name: "nftVestedAmount";
            type: "u32";
          },
          {
            name: "vestmentInitializedAt";
            type: "i64";
          },
          {
            name: "nftCollectionAddress";
            type: {
              option: "publicKey";
            };
          }
        ];
      };
    },
    {
      name: "nftVestmentRecord";
      type: {
        kind: "struct";
        fields: [
          {
            name: "nftMint";
            type: "publicKey";
          },
          {
            name: "cliffDate";
            type: "i64";
          },
          {
            name: "sourceTokenAccount";
            type: "publicKey";
          },
          {
            name: "dedicatedConsumer";
            type: "publicKey";
          },
          {
            name: "hasClaimed";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "vestmentData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "vestor";
            type: "publicKey";
          },
          {
            name: "consumer";
            type: "publicKey";
          },
          {
            name: "vestmentStart";
            type: "i64";
          },
          {
            name: "vestmentMint";
            type: "publicKey";
          },
          {
            name: "releaseTime";
            type: "i64";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "vestmentEnd";
            type: "i64";
          },
          {
            name: "releaseAmount";
            type: "u64";
          },
          {
            name: "cliffDate";
            type: {
              option: "i64";
            };
          },
          {
            name: "cliffReleaseAmount";
            type: "u64";
          },
          {
            name: "hasCliffed";
            type: "bool";
          },
          {
            name: "vestorCancelAuthority";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "consumerCancelAuthority";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "lastVestment";
            type: "i64";
          },
          {
            name: "withdrawnAmount";
            type: "u64";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "NftMetadataData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "symbol";
            type: "string";
          },
          {
            name: "uri";
            type: "string";
          }
        ];
      };
    },
    {
      name: "OfferStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Initialized";
          },
          {
            name: "Accepted";
          },
          {
            name: "Cancelled";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "WrongTokenAccMint";
      msg: "Wrong token account mint";
    },
    {
      code: 6001;
      name: "WrongOwner";
      msg: "Wrong token account owner";
    },
    {
      code: 6002;
      name: "TokenTransferFailure";
      msg: "Token transfer failed";
    },
    {
      code: 6003;
      name: "WrongClaimAuthority";
      msg: "Wrong claim authority";
    },
    {
      code: 6004;
      name: "WrongDestinationMint";
      msg: "Wrong destination account mint";
    },
    {
      code: 6005;
      name: "VestmentNotStarted";
      msg: "Vestment not started yet!";
    },
    {
      code: 6006;
      name: "TokensClaimed";
      msg: "All tokens already claimed";
    },
    {
      code: 6007;
      name: "WrongCancelAuthority";
      msg: "Not allowed to cancel vesting";
    },
    {
      code: 6008;
      name: "NftRecordAlredyInitialized";
      msg: "Account already initialized";
    },
    {
      code: 6009;
      name: "MissingCliffPeriod";
      msg: "Missing data about cliff period";
    },
    {
      code: 6010;
      name: "MissingDedicatedConsumers";
      msg: "Missing data about dedicated consumers";
    },
    {
      code: 6011;
      name: "WrongTokenAccAddress";
      msg: "Wrong token account address";
    },
    {
      code: 6012;
      name: "MissingMetadataData";
      msg: "Missing metadata data";
    }
  ];
};

export const IDL: TokenVesting = {
  version: "0.1.0",
  name: "token_vesting",
  instructions: [
    {
      name: "initializeVestmet",
      accounts: [
        {
          name: "sourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vestor",
          isMut: true,
          isSigner: true,
        },
        {
          name: "consumer",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vestmentMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vestmentData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vestedTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "solTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "releaseAmount",
          type: "u64",
        },
        {
          name: "vestmentStart",
          type: "i64",
        },
        {
          name: "vestmentEnd",
          type: "i64",
        },
        {
          name: "releasePeriod",
          type: "i64",
        },
        {
          name: "cliffStart",
          type: {
            option: "i64",
          },
        },
        {
          name: "cliffPercentage",
          type: {
            option: "u64",
          },
        },
      ],
    },
    {
      name: "claimVestedTokens",
      accounts: [
        {
          name: "vestmentData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vestor",
          isMut: false,
          isSigner: false,
        },
        {
          name: "consumer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "vestmentMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vestedTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destinationTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "solTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "cancelVestment",
      accounts: [
        {
          name: "vestmentData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vestmentMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vestedTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "vestor",
          isMut: true,
          isSigner: false,
        },
        {
          name: "solTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgam",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "initializeEscrow",
      accounts: [
        {
          name: "escrowData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "offeredMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "escrowInitializer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "wantedMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "offeredAmount",
          type: "u64",
        },
        {
          name: "wantedAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "acceptEscrowOffer",
      accounts: [
        {
          name: "escrowData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "offeredMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "wantedMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "escrowTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "acceptorTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowInitializer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "acceptor",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "vestNfts",
      accounts: [
        {
          name: "nftVestingData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vestedNftsOwner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftVestor",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "dedicatedTakers",
          type: {
            vec: "publicKey",
          },
        },
        {
          name: "nftAmount",
          type: "u32",
        },
        {
          name: "collectionAddress",
          type: {
            option: "publicKey",
          },
        },
        {
          name: "cliffDates",
          type: {
            vec: {
              option: "i64",
            },
          },
        },
      ],
    },
    {
      name: "claimVestedNft",
      accounts: [
        {
          name: "nftVestingData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vestedNftsOwner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftVestmentRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nftVestor",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vestedTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftConsumer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "destinationTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "mintNftCollection",
      accounts: [
        {
          name: "nftCollectionData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftAuthority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "collectionAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadataProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "nftMetadataData",
          type: {
            vec: {
              defined: "NftMetadataData",
            },
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "escrowData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "escrowInitializer",
            type: "publicKey",
          },
          {
            name: "sourceTokenAccount",
            type: "publicKey",
          },
          {
            name: "offeredAmount",
            type: "u64",
          },
          {
            name: "wantedAmount",
            type: "u64",
          },
          {
            name: "offeredMint",
            type: "publicKey",
          },
          {
            name: "wantedMint",
            type: "publicKey",
          },
          {
            name: "escrowTokenAccount",
            type: "publicKey",
          },
          {
            name: "escrowInitializedAt",
            type: "i64",
          },
          {
            name: "offerStatus",
            type: {
              defined: "OfferStatus",
            },
          },
        ],
      },
    },
    {
      name: "nftCollectionData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "collectionAuthority",
            type: "publicKey",
          },
          {
            name: "collectionAddress",
            type: "publicKey",
          },
          {
            name: "mintTimestamp",
            type: "i64",
          },
          {
            name: "numberOfNfts",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "nftVestingData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "nftVestmentCreator",
            type: "publicKey",
          },
          {
            name: "nftVestedAmount",
            type: "u32",
          },
          {
            name: "vestmentInitializedAt",
            type: "i64",
          },
          {
            name: "nftCollectionAddress",
            type: {
              option: "publicKey",
            },
          },
        ],
      },
    },
    {
      name: "nftVestmentRecord",
      type: {
        kind: "struct",
        fields: [
          {
            name: "nftMint",
            type: "publicKey",
          },
          {
            name: "cliffDate",
            type: "i64",
          },
          {
            name: "sourceTokenAccount",
            type: "publicKey",
          },
          {
            name: "dedicatedConsumer",
            type: "publicKey",
          },
          {
            name: "hasClaimed",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "vestmentData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "vestor",
            type: "publicKey",
          },
          {
            name: "consumer",
            type: "publicKey",
          },
          {
            name: "vestmentStart",
            type: "i64",
          },
          {
            name: "vestmentMint",
            type: "publicKey",
          },
          {
            name: "releaseTime",
            type: "i64",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "vestmentEnd",
            type: "i64",
          },
          {
            name: "releaseAmount",
            type: "u64",
          },
          {
            name: "cliffDate",
            type: {
              option: "i64",
            },
          },
          {
            name: "cliffReleaseAmount",
            type: "u64",
          },
          {
            name: "hasCliffed",
            type: "bool",
          },
          {
            name: "vestorCancelAuthority",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "consumerCancelAuthority",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "lastVestment",
            type: "i64",
          },
          {
            name: "withdrawnAmount",
            type: "u64",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "NftMetadataData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "symbol",
            type: "string",
          },
          {
            name: "uri",
            type: "string",
          },
        ],
      },
    },
    {
      name: "OfferStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Initialized",
          },
          {
            name: "Accepted",
          },
          {
            name: "Cancelled",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "WrongTokenAccMint",
      msg: "Wrong token account mint",
    },
    {
      code: 6001,
      name: "WrongOwner",
      msg: "Wrong token account owner",
    },
    {
      code: 6002,
      name: "TokenTransferFailure",
      msg: "Token transfer failed",
    },
    {
      code: 6003,
      name: "WrongClaimAuthority",
      msg: "Wrong claim authority",
    },
    {
      code: 6004,
      name: "WrongDestinationMint",
      msg: "Wrong destination account mint",
    },
    {
      code: 6005,
      name: "VestmentNotStarted",
      msg: "Vestment not started yet!",
    },
    {
      code: 6006,
      name: "TokensClaimed",
      msg: "All tokens already claimed",
    },
    {
      code: 6007,
      name: "WrongCancelAuthority",
      msg: "Not allowed to cancel vesting",
    },
    {
      code: 6008,
      name: "NftRecordAlredyInitialized",
      msg: "Account already initialized",
    },
    {
      code: 6009,
      name: "MissingCliffPeriod",
      msg: "Missing data about cliff period",
    },
    {
      code: 6010,
      name: "MissingDedicatedConsumers",
      msg: "Missing data about dedicated consumers",
    },
    {
      code: 6011,
      name: "WrongTokenAccAddress",
      msg: "Wrong token account address",
    },
    {
      code: 6012,
      name: "MissingMetadataData",
      msg: "Missing metadata data",
    },
  ],
};
