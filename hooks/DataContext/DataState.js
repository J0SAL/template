import { useEffect, useState } from "react";
import axiosClient from "./../../services/axios-client";
import DataContext from "./dataContext";

var demo_rulesets = [
  {
    id: 1,
    version: "2.1.1",
    status: "Draft",
    name: "APPLY-CREDIT-CARD",
    group: "CHAMPION",
    lastmodifiedby: "Joy Almieda",
    lastmodifieddate: "2023-12-22 08:56:36",
    options: [
      {
        name: "Edit Ruleset",
        link: "/edit-ruleset",
      },
      {
        name: "View change log",
        link: "",
      },
      {
        name: "Reset working copy",
        link: "",
      },
    ],
    rules: [
      {
        rule_id: 1,
        ruleName: "Rule1",
        ruleContent: "Rule1 Content",
      },
      {
        rule_id: 2,
        ruleName: "Rule2",
        ruleContent: "Rule2 Content",
      },
    ],
    dictionaries: [
      {
        dictId: 1,
        dictName: "Decision Request",
        dictContent: `
        {
          data: {
            type: "verificationcontexts",
            attribute: {
              type: "APPLY CARD",
              cpc: "EKS",
              application: {
                firstname: "Joy",
                lastname: "Almedia",
              },
            },
          },
          alias: {
            type: "application",
            value: "10892929",
          },
        };`,
      },
      {
        dictId: 2,
        dictName: "ID",
        dictContent: `
        {
          "id": "dummyid"
        }`,
      },
      {
        dictId: 3,
        dictName: "Request Headers",
        dictContent: `
        {
          "requestHeaders": ""
        }`,
      },
      {
        dictId: 4,
        dictName: "Results",
        dictContent: `
        {
          "response": {
            "data": {
              "id": "",
              "type": "DECISION",
              "attributes": {
                "expertName": "eds-account-identitiy-verification",
                "expertVersion": "1.0.1",
                "engineVersion": "2.1.0ead9857-435",
                "executionTimestamp": "",
                "decision": {
                  "advice": "",
                  "reason": "",
                  "verificationContexts": {
                    "data": {
                      "id": "",
                      "type": "",
                      "attributes": {}
                    }
                  }
                },
                "body": {}
              }
            },
            "errors": [
              {
                "id": "",
                "timestamp": "",
                "title": "",
                "details": "",
                "code": ""
              }
            ]
          }
        }`,
      },
      {
        dictId: 5,
        dictName: "Tracking",
        dictContent: `
        {
          "tracking": ""
        }`,
      },
    ],
  },
  {
    id: 2,
    version: "2.1.0",
    status: "Champion",
    name: "APPLY-CREDIT-CARD",
    group: "CHAMPION",
    lastmodifiedby: "Omkar Pavtekar",
    lastmodifieddate: "2023-05-26 07:53:36",
    options: [
      {
        name: "View Ruleset",
        link: "",
      },
      {
        name: "View change log",
        link: "",
      },
    ],
    rules: [],
    dictionaries: [],
  },
  {
    id: 3,
    version: "2.0.1",
    status: "Previously Deployed",
    name: "APPLY-CREDIT-CARD",
    group: "CHAMPION",
    lastmodifiedby: "Sagarika Matey",
    lastmodifieddate: "2023-01-10 08:56:36",
    options: [
      {
        name: "View Ruleset",
        link: "",
      },
      {
        name: "View change log",
        link: "",
      },
    ],
    rules: [],
    dictionaries: [],
  },
];

function DataState({ children }) {
  const [rulesets, setRulesets] = useState([]);

  const [activeRuleIndex, setActiveRuleIndex] = useState(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const item = localStorage.getItem("prime_rulesets");
      console.log(item);
      setRulesets(JSON.parse(item));
    } else {
      console.error("localStorage is not available in this environment.");
    }
    // localStorage.setItem("prime_rulesets", JSON.stringify(demo_rulesets));
  }, []);

  const updateLocalStorage = (data) => {
    localStorage.setItem("prime_rulesets", JSON.stringify(data));
  };

  const getRules = async () => {};
  const addRule = async (rulesetID, rule) => {
    let t = rulesets;
    let idx = t.findIndex((item) => item.id == rulesetID);
    rule.rule_id = t[idx]?.rules.length ?? 0 + 1;
    t[idx].rules.push(rule);
    setRulesets(t);
    updateLocalStorage(t);
  };
  const updateRule = async (rulesetID, rule) => {
    let t = rulesets;
    let rulesets_idx = t.findIndex((item) => item.id == rulesetID);
    let rule_idx = t[rulesets_idx].rules.findIndex(
      (item) => item.rule_id == rule.rule_id
    );
    t[rulesets_idx].rules[rule_idx] = rule;

    setRulesets(t);
    updateLocalStorage(t);
  };

  const addRuleset = async (ruleset) => {
    ruleset.id = rulesets?.length ?? 0 + 1;
    updateLocalStorage([...(rulesets ?? []), ruleset]);
    setRulesets([...(rulesets ?? []), ruleset]);
  };
  const deleteRule = async () => {};

  // set data
  const [data, setData] = useState(null);
  // get data
  const getData = async (formData) => {
    // console.log(formData);
    await axiosClient
      .post("get-data", formData)
      .then(function (response) {
        const res = response.data;
        setData(res.data);
        // console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <DataContext.Provider
      value={{
        rulesets,
        activeRuleIndex,
        setActiveRuleIndex,
        addRule,
        updateRule,
        addRuleset,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
