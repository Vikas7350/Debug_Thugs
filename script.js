function analyzeContract() {
    const fileInput = document.getElementById('contractUpload');
    const contractFile = fileInput.files[0];

    if (!contractFile) {
        alert("Please upload a contract file first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const content = event.target.result.trim(); // Trim whitespace
        simulateContractAnalysis(content);
    };
    reader.readAsText(contractFile);
}

function simulateContractAnalysis(content) {
    const isEmpty = content.length === 0; // Check if content is truly empty

    // Validate if the content is a contract
    const isContract = validateContractContent(content);

    const summaryText = !isEmpty
        ? isContract
            ? "This contract is for the agreement of services between Company A and Company B. The terms include payment conditions, service scope, and penalties."
            : "The uploaded file does not appear to be a valid contract. Please upload a valid contract file."
        : "The uploaded file is empty. No contract data found.";

    const risks = !isEmpty && isContract
        ? ["Risky Clauses:", "- Party A shall indemnify Party B for any losses.", "- In case of breach, the defaulting party shall be liable for penalties."]
        : [];

    // Store results in local storage for retrieval in results.html
    localStorage.setItem("contractSummary", summaryText);
    localStorage.setItem("riskList", JSON.stringify(risks));

    // Redirect to results page
    window.location.href = 'results.html';
}

function validateContractContent(content) {
    // Check for common contract keywords or patterns
    const contractKeywords = ["party a", "party b", "agreement", "terms", "conditions", "obligations", "indemnify", "liability"];
    const lowerCaseContent = content.toLowerCase();

    // If at least 3 keywords are found, assume it's a contract
    const foundKeywords = contractKeywords.filter(keyword => lowerCaseContent.includes(keyword));
    return foundKeywords.length >= 3;
}
