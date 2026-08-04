import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BenefitsPage extends BasePage {
  private readonly healthPlanSelect: Locator;
  private readonly dependentsSection: Locator;
  private readonly dependentsCountInput: Locator;
  private readonly retirementPctInput: Locator;
  private readonly equityGroup: Locator;
  private readonly equityGrantCheckbox: Locator;
  private readonly backButton: Locator;
  private readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);
    this.healthPlanSelect = page.getByTestId('select-healthPlan');
    this.dependentsSection = page.getByTestId('conditional-dependents');
    this.dependentsCountInput = page.getByTestId('input-dependentsCount');
    this.retirementPctInput = page.getByTestId('input-retirementPct');
    this.equityGroup = page.locator('#fg-equity');
    this.equityGrantCheckbox = page.getByTestId('checkbox-equityGrant');
    this.backButton = page.getByTestId('btn-back-3');
    this.nextButton = page.getByTestId('btn-next-3');
  }

  // healthPlan is the dropdown option text, e.g. "Premium".
  async selectHealthPlan(healthPlan: string): Promise<void> {
    await this.healthPlanSelect.selectOption({ label: healthPlan });
  }

  async setDependentsCount(count: number): Promise<void> {
    await this.dependentsCountInput.fill(String(count));
  }

  // Dependent name inputs are added one by one as input-dependent-0, input-dependent-1, ...
  async fillDependentName(index: number, name: string): Promise<void> {
    await this.page.getByTestId(`input-dependent-${index}`).fill(name);
  }

  async fillRetirementPct(pct: string): Promise<void> {
    await this.retirementPctInput.fill(pct);
  }

  async checkEquityGrant(): Promise<void> {
    await this.equityGrantCheckbox.check();
  }

  async uncheckEquityGrant(): Promise<void> {
    await this.equityGrantCheckbox.uncheck();
  }

  async goNext(): Promise<void> {
    await this.nextButton.click();
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
  }

  async expectDependentsSectionVisible(): Promise<void> {
    await expect(this.dependentsSection).toBeVisible();
  }

  async expectDependentsSectionHidden(): Promise<void> {
    await expect(this.dependentsSection).toBeHidden();
  }

  async expectRetirementEnabled(): Promise<void> {
    await expect(this.retirementPctInput).toBeEnabled();
  }

  async expectRetirementDisabled(): Promise<void> {
    await expect(this.retirementPctInput).toBeDisabled();
  }

  async expectEquityOptionVisible(): Promise<void> {
    await expect(this.equityGroup).toBeVisible();
  }

  async expectEquityOptionHidden(): Promise<void> {
    await expect(this.equityGroup).toBeHidden();
  }
}
