export default {
  saveOnboardingData: `
    INSERT INTO onboarding_data (
        id, company_name, year_founded, location, website, user_id,
        industry_type, business_model, funding_round, finance_type,
        amount, investor_presentation
    ) VALUES (
        $/id/, $/companyName/, $/yearFounded/, $/location/, $/website/,
        $/userId/, $/industryType/, $/businessModel/, $/fundingRound/,
        $/financeType/, $/amount/, $/investorPresentation/
    );
  `,
};
