var compiledJSON = {
  "options": {
    "syntax": "proto3"
  },
  "nested": {
    "ORTBRequest2": {
      "fields": {
        "id": {
          "type": "string",
          "id": 1
        },
        "at": {
          "type": "uint32",
          "id": 2
        },
        "cur": {
          "rule": "repeated",
          "type": "string",
          "id": 3
        },
        "imp": {
          "rule": "repeated",
          "type": "Imp",
          "id": 4
        },
        "site": {
          "type": "Site",
          "id": 5
        },
        "device": {
          "type": "Device",
          "id": 6
        },
        "user": {
          "type": "User",
          "id": 7
        },
        "ext": {
          "type": "Ext3",
          "id": 8
        },
        "tmax": {
          "type": "uint32",
          "id": 9
        },
        "regs": {
          "type": "Regs",
          "id": 10
        }
      },
      "nested": {
        "Ext": {
          "fields": {}
        },
        "Format": {
          "fields": {
            "w": {
              "type": "uint32",
              "id": 1
            },
            "h": {
              "type": "uint32",
              "id": 2
            }
          }
        },
        "Banner": {
          "fields": {
            "w": {
              "type": "uint32",
              "id": 1
            },
            "h": {
              "type": "uint32",
              "id": 2
            },
            "pos": {
              "type": "uint32",
              "id": 3
            },
            "format": {
              "rule": "repeated",
              "type": "Format",
              "id": 4
            },
            "topframe": {
              "type": "uint32",
              "id": 5
            }
          }
        },
        "Imp": {
          "fields": {
            "id": {
              "type": "string",
              "id": 1
            },
            "tagid": {
              "type": "string",
              "id": 2
            },
            "bidfloor": {
              "type": "double",
              "id": 3
            },
            "bidfloorcur": {
              "type": "string",
              "id": 4
            },
            "secure": {
              "type": "uint32",
              "id": 5
            },
            "ext": {
              "type": "Ext",
              "id": 6
            },
            "banner": {
              "type": "Banner",
              "id": 7
            }
          }
        },
        "Publisher": {
          "fields": {
            "id": {
              "type": "string",
              "id": 1
            }
          }
        },
        "Site": {
          "fields": {
            "page": {
              "type": "string",
              "id": 1
            },
            "domain": {
              "type": "string",
              "id": 2
            },
            "ref": {
              "type": "string",
              "id": 3
            },
            "publisher": {
              "type": "Publisher",
              "id": 4
            }
          }
        },
        "Geo": {
          "fields": {}
        },
        "Device": {
          "fields": {
            "ua": {
              "type": "string",
              "id": 1
            },
            "js": {
              "type": "uint32",
              "id": 2
            },
            "h": {
              "type": "uint32",
              "id": 3
            },
            "w": {
              "type": "uint32",
              "id": 4
            },
            "dnt": {
              "type": "uint32",
              "id": 5
            },
            "language": {
              "type": "string",
              "id": 6
            },
            "geo": {
              "type": "Geo",
              "id": 7
            }
          }
        },
        "Geo1": {
          "fields": {}
        },
        "Ext1": {
          "fields": {
            "linkType": {
              "type": "uint32",
              "id": 1
            },
            "pba": {
              "type": "string",
              "id": 2
            }
          }
        },
        "Uids": {
          "fields": {
            "id": {
              "type": "string",
              "id": 1
            },
            "atype": {
              "type": "uint32",
              "id": 2
            },
            "ext": {
              "type": "Ext1",
              "id": 3
            }
          }
        },
        "Eids": {
          "fields": {
            "source": {
              "type": "string",
              "id": 1
            },
            "uids": {
              "rule": "repeated",
              "type": "Uids",
              "id": 2
            }
          }
        },
        "Ext2": {
          "fields": {
            "consent": {
              "type": "string",
              "id": 1
            }
          }
        },
        "User": {
          "fields": {
            "geo": {
              "type": "Geo1",
              "id": 1
            },
            "eids": {
              "rule": "repeated",
              "type": "Eids",
              "id": 2
            },
            "ext": {
              "type": "Ext2",
              "id": 3
            }
          }
        },
        "Wrapper": {
          "fields": {
            "wp": {
              "type": "string",
              "id": 1
            },
            "wv": {
              "type": "string",
              "id": 2
            },
            "transactionId": {
              "type": "string",
              "id": 3
            }
          }
        },
        "Ext3": {
          "fields": {
            "wrapper": {
              "type": "Wrapper",
              "id": 1
            }
          }
        },
        "Ext4": {
          "fields": {
            "gdpr": {
              "type": "uint32",
              "id": 1
            }
          }
        },
        "Regs": {
          "fields": {
            "ext": {
              "type": "Ext4",
              "id": 1
            }
          }
        }
      }
    }
  }
};
