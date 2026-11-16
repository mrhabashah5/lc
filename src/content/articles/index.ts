import { checkCreditReportPakistan } from "./check-credit-report-pakistan";
import { checkLoanAppSecpApproved } from "./check-loan-app-secp-approved";
import { clearanceLetterExplained } from "./clearance-letter-noc-explained";
import { closeLoanAppLoan } from "./close-loan-app-loan-pakistan";
import { loanAppHarassment } from "./loan-app-harassment-pakistan";
import { loanClearanceCertificateNoc } from "./loan-clearance-certificate-noc-pakistan";
import { settlementVsClearance } from "./loan-settlement-vs-loan-clearance";
import { removeBankLienCar } from "./remove-bank-lien-car-registration-pakistan";
import { understandingCreditRecord } from "./understanding-your-credit-record-in-pakistan";

/** All long-form guides, in the order they appear on the site. */
export const guides = [
  loanClearanceCertificateNoc,
  closeLoanAppLoan,
  checkLoanAppSecpApproved,
  loanAppHarassment,
  settlementVsClearance,
  checkCreditReportPakistan,
  removeBankLienCar,
  clearanceLetterExplained,
  understandingCreditRecord,
];

export * from "./types";
