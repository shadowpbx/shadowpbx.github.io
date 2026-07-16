import { EconomicModel } from '../types';

export const modelsData: EconomicModel[] = [
  {
    id: 'ppc',
    name: 'Production Possibilities Curve (PPC)',
    category: 'foundations',
    description: 'The PPC represents the maximum combination of two goods an economy can produce given fixed resources and technology. It illustrates scarcity, opportunity cost, trade-offs, and efficiency.',
    yAxis: 'Capital Goods',
    xAxis: 'Consumer Goods',
    keyConcepts: [
      'Points on the curve are productively efficient.',
      'Points inside the curve represent inefficiency/unemployment.',
      'Points outside the curve are currently unattainable given current resources.',
      'A bowed-out curve represents increasing opportunity costs (Law of Increasing Opportunity Costs due to non-homogenous resources).',
      'A straight-line curve represents constant opportunity costs (perfectly adaptable resources).',
      'Economic growth is represented by an outward shift of the entire curve.'
    ],
    shifters: [
      {
        group: 'Outward Shifters (Economic Growth)',
        items: [
          'Increase in quantity or quality of resources (Land, Labor, Capital, Entrepreneurship)',
          'Technological advancements',
          'Improvements in human capital (education/training)'
        ]
      },
      {
        group: 'Inward Shifters (Contraction)',
        items: [
          'Natural disasters destroying physical capital',
          'Loss of population or human capital'
        ]
      }
    ],
    formulas: [
      'Opportunity Cost = What is given up / What is gained'
    ],
    quizzes: [
      {
        id: 'ppc_q1',
        question: 'Which of the following would cause the entire Production Possibilities Curve to shift outward?',
        options: [
          'A decrease in the unemployment rate',
          'An increase in the country\'s stock of capital goods',
          'A change in consumer preferences from capital to consumer goods',
          'An increase in the price of raw materials'
        ],
        correctIndex: 1,
        explanation: 'An increase in the stock of capital goods increases the productive capacity of the economy, shifting the PPC outward. A decrease in unemployment is represented by a movement from a point inside the curve toward the curve, not a shift of the curve.'
      },
      {
        id: 'ppc_q2',
        question: 'What does a bowed-out (concave) PPC imply about the opportunity cost of producing more consumer goods?',
        options: [
          'Opportunity cost remains constant.',
          'Opportunity cost is decreasing.',
          'Opportunity cost is increasing.',
          'Opportunity cost is zero.'
        ],
        correctIndex: 2,
        explanation: 'A bowed-out PPC illustrates the Law of Increasing Opportunity Costs. As you produce more of one good, you must give up increasingly larger amounts of the other because resources are not perfectly adaptable to producing both goods.'
      }
    ]
  },
  {
    id: 'supply-demand',
    name: 'Supply and Demand (Single Market)',
    category: 'micro',
    description: 'The fundamental model of market economics. It shows how the interaction of buyers (demand) and sellers (supply) determines the market clearing price and quantity of a single good or service.',
    yAxis: 'Price (P)',
    xAxis: 'Quantity (Q)',
    keyConcepts: [
      'Law of Demand: Price and Quantity Demanded are inversely related.',
      'Law of Supply: Price and Quantity Supplied are directly related.',
      'Equilibrium occurs where Quantity Demanded equals Quantity Supplied (QD = QS).',
      'Price Ceilings are set below equilibrium and cause shortages.',
      'Price Floors are set above equilibrium and cause surpluses.',
      'Consumer Surplus is the area below demand and above price. Producer Surplus is the area above supply and below price.'
    ],
    shifters: [
      {
        group: 'Demand Shifters (Biting/T-I-P-E-S)',
        items: [
          'Tastes and preferences',
          'Income (Normal vs. Inferior goods)',
          'Prices of related goods (Substitutes and Complements)',
          'Expectations of future prices',
          'Size of the market (Number of buyers)'
        ]
      },
      {
        group: 'Supply Shifters (R-O-T-E-S)',
        items: [
          'Resource prices (Cost of inputs)',
          'Other goods\' prices (production substitutes)',
          'Technology/Productivity',
          'Expectations of future prices',
          'Subsidy or Taxes (Government policy)',
          'Number of sellers'
        ]
      }
    ],
    formulas: [
      'Total Revenue = Price × Quantity',
      'Consumer Surplus = Maximum willingness to pay - Actual Price paid',
      'Producer Surplus = Actual Price received - Minimum acceptable price'
    ],
    quizzes: [
      {
        id: 'sd_q1',
        question: 'If the price of butter (a strong complement to bread) increases, what will happen in the market for bread?',
        options: [
          'Demand for bread shifts left, lowering price and quantity.',
          'Demand for bread shifts right, raising price and quantity.',
          'Supply of bread shifts left, raising price and lowering quantity.',
          'Supply of bread shifts right, lowering price and raising quantity.'
        ],
        correctIndex: 0,
        explanation: 'Since butter and bread are complements, an increase in the price of butter leads to a decrease in the demand for bread (shifting the demand curve left), resulting in a lower equilibrium price and quantity of bread.'
      },
      {
        id: 'sd_q2',
        question: 'A binding price ceiling is placed on rental apartments. What is the immediate expected market consequence?',
        options: [
          'An increase in the supply of rental apartments',
          'A market surplus of apartments',
          'A market shortage of apartments',
          'A decrease in the demand for apartments'
        ],
        correctIndex: 2,
        explanation: 'A binding price ceiling must be set below the market equilibrium price. At this lower price, the quantity demanded exceeds the quantity supplied, resulting in a persistent market shortage.'
      }
    ]
  },
  {
    id: 'circular-flow',
    name: 'The Circular Flow Model',
    category: 'foundations',
    description: 'A visual representation of the macroeconomy illustrating how resource factors, goods, services, and monetary payments circulate between households, businesses, the government, and the financial sector.',
    yAxis: 'Flow Velocity',
    xAxis: 'Sectors',
    keyConcepts: [
      'Households own all the factors of production (Land, Labor, Capital, Entrepreneurship) and sell them in the Resource Market.',
      'Businesses buy factors of production to produce goods and services, which they sell in the Product Market.',
      'Households spend consumer expenditures in the Product Market, which becomes revenue for Businesses.',
      'Businesses pay wages, rent, interest, and profit in the Resource Market, which becomes income for Households.',
      'Government interacts by collecting taxes and providing public goods/services and subsidies/transfer payments.'
    ],
    shifters: [
      {
        group: 'Injections into Flow',
        items: [
          'Investment (I)',
          'Government Purchases (G)',
          'Exports (X)'
        ]
      },
      {
        group: 'Leakages from Flow',
        items: [
          'Savings (S)',
          'Taxes (T)',
          'Imports (M)'
        ]
      }
    ],
    formulas: [
      'GDP = C + I + G + (X - M) [Expenditures Approach]',
      'National Income = Wages + Rent + Interest + Profit [Income Approach]'
    ],
    quizzes: [
      {
        id: 'cf_q1',
        question: 'In the circular flow model, where do households sell their labor and where do they buy consumer goods?',
        options: [
          'Sell in product market; buy in resource market',
          'Sell in resource market; buy in product market',
          'Sell to other households; buy from the government',
          'Sell in factor market; buy in financial market'
        ],
        correctIndex: 1,
        explanation: 'Households sell their productive services (labor, land, capital) in the resource/factor market to businesses, and buy finished products in the product market.'
      }
    ]
  },
  {
    id: 'ad-as',
    name: 'Aggregate Demand and Aggregate Supply (AD/AS)',
    category: 'macro',
    description: 'The core macroeconomic model showing the determination of real national output (GDPr) and the aggregate price level (PL). It illustrates long-run economic growth, short-run economic fluctuations, and recessionary/inflationary gaps.',
    yAxis: 'Price Level (PL)',
    xAxis: 'Real GDP (Y)',
    keyConcepts: [
      'Aggregate Demand (AD) is downward sloping due to the Wealth Effect, Interest Rate Effect, and Foreign Purchases Effect.',
      'Short-Run Aggregate Supply (SRAS) is upward sloping due to sticky wages and resource prices.',
      'Long-Run Aggregate Supply (LRAS) is vertical at full employment (YF / Natural Rate of Output).',
      'Recessionary Gap occurs when short-run equilibrium is to the left of LRAS.',
      'Inflationary Gap occurs when short-run equilibrium is to the right of LRAS.',
      'Stagflation occurs when SRAS shifts to the left, causing higher price levels (inflation) and lower output (recession).'
    ],
    shifters: [
      {
        group: 'AD Shifters (C + I + G + Xn)',
        items: [
          'Consumer spending (Consumer confidence, taxes, wealth)',
          'Investment spending (Real interest rates, business expectations)',
          'Government spending',
          'Net export spending (foreign income, exchange rates)'
        ]
      },
      {
        group: 'SRAS Shifters (R-A-P)',
        items: [
          'Resource prices (nominal wages, oil prices, commodity shocks)',
          'Actions of Government (business taxes, regulations, subsidies)',
          'Productivity and Technology'
        ]
      },
      {
        group: 'LRAS Shifters',
        items: [
          'Changes in quantity/quality of resources (same as PPC growth)',
          'Technological growth and productivity capital'
        ]
      }
    ],
    formulas: [
      'Aggregate Expenditures = C + I + G + (X - M)',
      'Spending Multiplier = 1 / MPS = 1 / (1 - MPC)',
      'Tax Multiplier = -MPC / MPS = Spending Multiplier - 1'
    ],
    quizzes: [
      {
        id: 'adas_q1',
        question: 'An economy is in a long-run equilibrium. If the government significantly increases spending without raising taxes, what are the expected short-run and long-run effects on real GDP?',
        options: [
          'Short-run: Real GDP increases; Long-run: Real GDP returns to full employment but at a higher price level.',
          'Short-run: Real GDP decreases; Long-run: Real GDP decreases permanently.',
          'Short-run: Real GDP increases; Long-run: Real GDP remains permanently higher than full employment.',
          'Short-run: No change; Long-run: Real GDP increases.'
        ],
        correctIndex: 0,
        explanation: 'In the short run, higher government spending (G) shifts AD right, increasing output and price level (inflationary gap). In the long run, nominal wages adapt to higher inflation, shifting SRAS left back to the vertical LRAS, returning GDP to its full-employment level but at a permanently higher price level.'
      },
      {
        id: 'adas_q2',
        question: 'Which of the following would lead to "stagflation" (simultaneous inflation and recession)?',
        options: [
          'An outward shift in Aggregate Demand',
          'An inward shift in Short-Run Aggregate Supply',
          'An outward shift in Long-Run Aggregate Supply',
          'A decrease in consumer spending'
        ],
        correctIndex: 1,
        explanation: 'A negative supply shock (such as a sudden spike in oil prices) shifts SRAS to the left. This causes the price level to rise (inflation) and real output to contract (recession), creating stagflation.'
      }
    ]
  },
  {
    id: 'money-market',
    name: 'The Money Market',
    category: 'macro',
    description: 'The interaction of money demand (by households and firms) and money supply (controlled by the Central Bank) which determines the nominal interest rate in the economy.',
    yAxis: 'Nominal Interest Rate (ir)',
    xAxis: 'Quantity of Money (M)',
    keyConcepts: [
      'Money Supply (MS) is vertical because it is determined independently by the Central Bank (e.g., Federal Reserve).',
      'Money Demand (MD) is downward sloping. It consists of Transaction Demand (holding cash to buy things) and Asset Demand (holding cash as a store of value, which has an opportunity cost of foregone interest).',
      'An increase in MS lowers the nominal interest rate; a decrease in MS raises it.',
      'Central Bank implements expansionary policy by buying bonds, lowering the reserve requirement, or lowering the discount rate.'
    ],
    shifters: [
      {
        group: 'Money Demand (MD) Shifters',
        items: [
          'Changes in Aggregate Price Level (higher prices require more cash to shop)',
          'Changes in Real GDP / Income (more income means more transactions)',
          'Changes in banking technology (credit cards lower cash demand)'
        ]
      },
      {
        group: 'Money Supply (MS) Shifters (Central Bank Tools)',
        items: [
          'Open Market Operations (Buying or selling government treasury bonds)',
          'Changing the Reserve Requirement ratio',
          'Changing the Discount Rate or Interest on Reserves (IOR)'
        ]
      }
    ],
    formulas: [
      'Money Multiplier = 1 / Reserve Requirement Ratio',
      'Maximum Money Creation = Excess Reserves × Money Multiplier'
    ],
    quizzes: [
      {
        id: 'mm_q1',
        question: 'If the Federal Reserve conducts an open-market sale of government bonds, what will happen to the money supply and nominal interest rates?',
        options: [
          'Money supply shifts right, interest rates decrease.',
          'Money supply shifts left, interest rates increase.',
          'Money demand shifts left, interest rates decrease.',
          'Money supply shifts left, interest rates decrease.'
        ],
        correctIndex: 1,
        explanation: 'Selling bonds ("Sell = Small" money supply) takes money out of the banking system, shifting the vertical MS curve to the left. This increases the equilibrium nominal interest rate.'
      },
      {
        id: 'mm_q2',
        question: 'Which of the following best explains why the demand curve for money is downward sloping?',
        options: [
          'As the interest rate rises, households prefer to hold more liquid cash.',
          'As the interest rate rises, the opportunity cost of holding cash increases, so people hold less cash.',
          'The central bank forces money demand to decrease when rates are high.',
          'As prices fall, people need more money.'
        ],
        correctIndex: 1,
        explanation: 'The interest rate represents the opportunity cost of holding non-interest-earning liquid cash. When interest rates are high, people prefer to hold funds in interest-bearing assets rather than cash, reducing the quantity of money demanded.'
      }
    ]
  },
  {
    id: 'loanable-funds',
    name: 'The Loanable Funds Market',
    category: 'macro',
    description: 'This market coordinates savers (who supply funds) and borrowers/investors (who demand funds), determining the real interest rate (r) and the quantity of private investment.',
    yAxis: 'Real Interest Rate (r)',
    xAxis: 'Quantity of Loanable Funds (QLF)',
    keyConcepts: [
      'Supply of Loanable Funds (SLF) comes from national savings (private savings + public savings) and net capital inflows. It is upward sloping.',
      'Demand for Loanable Funds (DLF) comes from private investment and government borrowing. It is downward sloping.',
      'The intersection determines the equilibrium Real Interest Rate.',
      'A budget deficit (government borrowing) increases DLF (or decreases SLF), raising real interest rates and "crowding out" private investment.'
    ],
    shifters: [
      {
        group: 'Demand for Loanable Funds (DLF) Shifters',
        items: [
          'Changes in business investment opportunities/confidence',
          'Changes in government borrowing (budget deficits shift DLF right)'
        ]
      },
      {
        group: 'Supply of Loanable Funds (SLF) Shifters',
        items: [
          'Changes in household saving behavior (thriftiness)',
          'Changes in capital inflows from foreign investors',
          'Changes in government budget balance (budget surpluses shift SLF right)'
        ]
      }
    ],
    formulas: [
      'Fisher Equation: Real Interest Rate (r) = Nominal Interest Rate (ir) - Expected Inflation (π)',
      'National Savings = (Y - T - C) + (T - G)'
    ],
    quizzes: [
      {
        id: 'lf_q1',
        question: 'When the government runs a budget deficit, it must borrow. What is the expected impact on the loanable funds market and private investment?',
        options: [
          'SLF shifts right, lowering real interest rates and increasing investment.',
          'DLF shifts right, raising real interest rates and crowding out private investment.',
          'DLF shifts left, lowering real interest rates and encouraging investment.',
          'SLF shifts left, raising real interest rates and increasing investment.'
        ],
        correctIndex: 1,
        explanation: 'Government borrowing increases the demand for loanable funds, shifting DLF to the right. This drives up the real interest rate. Because borrowing is now more expensive, private firms reduce their investment spending, an effect known as "crowding out."'
      }
    ]
  },
  {
    id: 'phillips-curve',
    name: 'The Phillips Curve (Short-Run and Long-Run)',
    category: 'macro',
    description: 'Shows the relationship between the inflation rate and the unemployment rate in an economy. It mirrors the AD/AS model in representing economic cycles and long-run states.',
    yAxis: 'Inflation Rate (π)',
    xAxis: 'Unemployment Rate (u)',
    keyConcepts: [
      'Short-Run Phillips Curve (SRPC) is downward sloping, showing a trade-off between inflation and unemployment.',
      'Long-Run Phillips Curve (LRPC) is vertical at the Natural Rate of Unemployment (NRU), showing no trade-off in the long run.',
      'Movements ALONG SRPC are caused by shifts in Aggregate Demand (AD). AD right causes movement up/left along SRPC.',
      'Shifts of the SRPC are caused by shifts in Aggregate Supply (SRAS). A decrease in SRAS (supply shock) shifts SRPC right (stagflation, higher inflation and higher unemployment).',
      'The LRPC shifts left or right with changes in the Natural Rate of Unemployment.'
    ],
    shifters: [
      {
        group: 'Movements Along SRPC',
        items: [
          'AD shifts Right → Move up-left along SRPC (Higher inflation, lower unemployment)',
          'AD shifts Left → Move down-right along SRPC (Lower inflation, higher unemployment)'
        ]
      },
      {
        group: 'Shifts of SRPC (Opposite of SRAS)',
        items: [
          'SRAS shifts Left → SRPC shifts Right (Stagflation: higher inflation and unemployment)',
          'SRAS shifts Right → SRPC shifts Left (Oasis: lower inflation and unemployment)',
          'Changes in inflationary expectations shift SRPC'
        ]
      },
      {
        group: 'LRPC Shifters',
        items: [
          'Changes in the Natural Rate of Unemployment (NRU)',
          'Changes in structural or frictional unemployment (e.g., job training programs, unemployment benefits)'
        ]
      }
    ],
    formulas: [
      'Unemployment Rate = (Unemployed / Labor Force) × 100',
      'Natural Rate of Unemployment (NRU) = Frictional + Structural Unemployment'
    ],
    quizzes: [
      {
        id: 'pc_q1',
        question: 'If the Aggregate Demand in an economy decreases due to a drop in consumer confidence, how is this illustrated on the Phillips Curve?',
        options: [
          'The SRPC shifts to the right.',
          'The SRPC shifts to the left.',
          'A movement down and to the right along the SRPC.',
          'A movement up and to the left along the SRPC.'
        ],
        correctIndex: 2,
        explanation: 'A decrease in AD leads to a lower price level (lower inflation) and lower output (higher unemployment). On the Phillips Curve, this is represented by a movement down-right along the downward-sloping SRPC.'
      },
      {
        id: 'pc_q2',
        question: 'An increase in inflationary expectations will cause which of the following changes on the Phillips Curve?',
        options: [
          'A movement up along the SRPC',
          'A shift of the SRPC to the right',
          'A shift of the LRPC to the right',
          'A shift of the SRPC to the left'
        ],
        correctIndex: 1,
        explanation: 'When workers and firms expect higher future inflation, they negotiate higher nominal wages, which increases production costs and shifts SRAS left. This shifts the SRPC rightward, so that any given level of unemployment is associated with a higher level of inflation.'
      }
    ]
  },
  {
    id: 'forex',
    name: 'The Foreign Exchange Market (FOREX)',
    category: 'macro',
    description: 'Shows how the exchange rate between two currencies is determined in a flexible exchange rate system by the supply and demand for a currency.',
    yAxis: 'Exchange Rate (Foreign currency per Domestic currency)',
    xAxis: 'Quantity of Domestic Currency',
    keyConcepts: [
      'Demand for a currency is determined by foreign buyers wishing to purchase domestic goods, services, or assets.',
      'Supply of a currency is determined by domestic residents wishing to sell their currency to purchase foreign goods, services, or assets.',
      'Appreciation: Value of currency increases. Occurs when demand shifts right or supply shifts left.',
      'Depreciation: Value of currency decreases. Occurs when demand shifts left or supply shifts right.',
      'Always remember: Currencies act in mirrors. If Currency A appreciates, Currency B must depreciate.'
    ],
    shifters: [
      {
        group: 'Currency Demand & Supply Shifters (T-I-P-S)',
        items: [
          'Tastes (Foreign demand for exports shifts Demand right)',
          'Relative Interest Rates (Higher domestic rates attract foreign capital, shifting Demand right & reducing Supply, appreciating currency)',
          'Relative Price Levels / Inflation (Higher inflation makes exports expensive, shifting Demand left, depreciating currency)',
          'Speculation & expectations'
        ]
      }
    ],
    formulas: [
      'Exchange Rate (A/B) = Currency B per unit of Currency A'
    ],
    quizzes: [
      {
        id: 'fx_q1',
        question: 'If real interest rates in the United States rise relative to those in the European Union, what will happen to the international value of the US Dollar ($) in the FOREX market?',
        options: [
          'Foreign investors seek US financial assets, shifting demand for Dollars right, appreciating the Dollar.',
          'US investors seek European assets, shifting supply of Dollars right, depreciating the Dollar.',
          'Demand for Dollars shifts left, depreciating the Dollar.',
          'The supply of Dollars shifts right, appreciating the Dollar.'
        ],
        correctIndex: 0,
        explanation: 'Higher US real interest rates attract foreign financial capital seeking higher yields. European investors must buy Dollars to purchase US bonds, shifting the demand for US Dollars to the right, which appreciates the Dollar.'
      }
    ]
  },
  {
    id: 'business-cycle',
    name: 'The Business Cycle',
    category: 'foundations',
    description: 'A visual model showing the periodic fluctuations of economic activity (Real GDP) over time around the long-run growth trend.',
    yAxis: 'Real GDP',
    xAxis: 'Time',
    keyConcepts: [
      'The upward-sloping straight line represents the secular Long-run Growth Trend (determined by resources and tech).',
      'The wave-like line represents the actual short-run fluctuations of output.',
      'Peak: The highest point of economic activity, where inflation pressure is highest and unemployment is lowest.',
      'Contraction / Recession: Period of declining output, falling inflation, and rising unemployment (two consecutive quarters of declining GDP).',
      'Trough: The lowest turning point, where unemployment is highest.',
      'Expansion / Recovery: Period of rising output, increasing employment, and returning price levels.'
    ],
    shifters: [
      {
        group: 'Phases of the Cycle',
        items: [
          'Peak (Maximum economic activity)',
          'Contraction (Recession, negative output gap)',
          'Trough (Local minimum output)',
          'Expansion (Recovery, closing the output gap)'
        ]
      }
    ],
    formulas: [
      'Output Gap = Actual GDP - Potential GDP'
    ],
    quizzes: [
      {
        id: 'bc_q1',
        question: 'A contractionary phase of the business cycle is characterized by which of the following indicators?',
        options: [
          'Increasing real GDP and decreasing unemployment rate',
          'Decreasing real GDP and increasing unemployment rate',
          'Increasing real GDP and increasing price levels',
          'Decreasing real GDP and decreasing unemployment rate'
        ],
        correctIndex: 1,
        explanation: 'A contraction or recession is defined by a downturn in economic activity, meaning real GDP is falling and businesses are laying off workers, leading to higher unemployment.'
      }
    ]
  },
  {
    id: 'laffer-curve',
    name: 'The Laffer Curve',
    category: 'macro',
    description: 'An illustration of the relationship between tax rates and the total tax revenue collected by the government. It argues that beyond a certain optimum rate, higher tax rates reduce the incentive to work, decreasing revenue.',
    yAxis: 'Tax Revenue ($)',
    xAxis: 'Tax Rate (%)',
    keyConcepts: [
      'At 0% tax rate, tax revenue is $0.',
      'At 100% tax rate, tax revenue is also $0 because there is no incentive to work or declare income.',
      'There is an optimum tax rate (t*) that maximizes government tax revenue.',
      'To the left of t*, increasing the tax rate increases revenue (Arithmetical effect).',
      'To the right of t*, increasing the tax rate decreases revenue because the base of taxable income shrinks (Economic/incentive effect).'
    ],
    shifters: [
      {
        group: 'Laffer Dynamics',
        items: [
          'Incentive Effect (high tax rates discourage work, investment, and compliance)',
          'Tax avoidance & evasion increase at high rates',
          'Supply-side Economics: Lowering high tax rates can potentially expand the tax base'
        ]
      }
    ],
    formulas: [
      'Tax Revenue = Tax Rate × Tax Base'
    ],
    quizzes: [
      {
        id: 'lc_q1',
        question: 'If the current tax rate is extremely high and positioned on the downward-sloping side of the Laffer Curve, what will happen to tax revenue if the government reduces the tax rate?',
        options: [
          'Tax revenue will decrease to zero.',
          'Tax revenue will increase as workers and businesses increase economic activity.',
          'Tax revenue will remain exactly the same.',
          'Tax revenue will fluctuate wildly.'
        ],
        correctIndex: 1,
        explanation: 'If tax rates are high enough to stifle work and investment (to the right of the optimum rate), cutting tax rates will improve work incentives and business investment, broadening the taxable income base and increasing total tax revenue.'
      }
    ]
  },
  {
    id: 'keynesian-cross',
    name: 'The Keynesian Cross (Aggregate Expenditure)',
    category: 'macro',
    description: 'A structural model showing how aggregate expenditures (AE) determine equilibrium real GDP in the short run when prices are sticky. It illustrates the multiplier effect and output gaps.',
    yAxis: 'Aggregate Expenditures (AE)',
    xAxis: 'Real GDP / Income (Y)',
    keyConcepts: [
      'The 45-degree line represents where Aggregate Expenditures equal actual output/income (AE = Y). This is the equilibrium line.',
      'The AE line (C + Ip + G + Xn) has a positive slope equal to the Marginal Propensity to Consume (MPC).',
      'If AE is above the 45-degree line, inventories fall unexpectedly, causing firms to expand production.',
      'If AE is below the 45-degree line, inventories pile up unexpectedly, causing firms to cut production.'
    ],
    shifters: [
      {
        group: 'AE Curve Shifters (Vertical Shifts)',
        items: [
          'Changes in autonomous consumption (Co)',
          'Changes in planned investment (Ip)',
          'Changes in government purchases (G)',
          'Changes in net exports (Xn)'
        ]
      }
    ],
    formulas: [
      'AE = Co + MPC × (Y - T) + Ip + G + Xn',
      'MPC + MPS = 1',
      'Spending Multiplier = 1 / (1 - MPC)'
    ],
    quizzes: [
      {
        id: 'kc_q1',
        question: 'What does the slope of the planned Aggregate Expenditures line represent in the Keynesian Cross model?',
        options: [
          'The average propensity to save',
          'The inflation rate',
          'The Marginal Propensity to Consume (MPC)',
          'The real interest rate'
        ],
        correctIndex: 2,
        explanation: 'In the Keynesian Cross, the Aggregate Expenditures line has a slope equal to the Marginal Propensity to Consume (MPC) because consumer spending is the only element that varies directly with national income (Y).'
      }
    ]
  }
];
