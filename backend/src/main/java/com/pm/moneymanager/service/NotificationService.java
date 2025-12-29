package com.pm.moneymanager.service;

import com.pm.moneymanager.dto.ExpenseDTO;
import com.pm.moneymanager.model.Expense;
import com.pm.moneymanager.model.Profile;
import com.pm.moneymanager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;

    @Value("${money.manager.frontend.url}")
    private String frontendUrl;

    @Scheduled(cron = "0 0 22 * * *", zone = "IST")
    public void sendDailyIncomeExpenseReminder() {
        log.info("Job Started : Sending Daily income expense reminder");
        List<Profile> profiles = profileRepository.findAll();
        for (Profile profile : profiles) {
            String body =
                    "<div style='font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;'>"
                            + "  <div style='max-width: 600px; margin: auto; background-color: #ffffff; "
                            + "       padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'>"

                            + "    <h2 style='color: #2c3e50;'>Hi " + profile.getFullName() + " 👋</h2>"

                            + "    <p style='font-size: 15px; color: #555;'>"
                            + "      This is your <b>daily income & expense reminder</b>."
                            + "      Keeping track daily helps you stay in control of your finances 💰."
                            + "    </p>"

                            + "    <div style='text-align: center; margin: 30px 0;'>"
                            + "      <a href='" + frontendUrl + "' "
                            + "         style='background-color: #4CAF50; color: white; padding: 12px 24px; "
                            + "                text-decoration: none; border-radius: 6px; font-size: 16px;'>"
                            + "        Add Today’s Expenses"
                            + "      </a>"
                            + "    </div>"

                            + "    <p style='font-size: 14px; color: #777;'>"
                            + "      If you've already added your expenses today, great job! 🎉"
                            + "    </p>"

                            + "    <hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'/>"

                            + "    <p style='font-size: 13px; color: #999;'>"
                            + "      Best regards,<br>"
                            + "      <b>Money Manager Team</b>"
                            + "    </p>"

                            + "  </div>"
                            + "</div>";

            emailService.sendEmail(profile.getEmail(), "Daily reminder: Add your income and expense to your profile", body);
        }
        log.info("Job completed : Sent Daily income expense reminder");
    }

    @Scheduled(cron = "0 0 23 * * *", zone = "IST")
    public void sendDailyExpenseSummary() {
        log.info("Job Started : Sending Daily expense summary");

        List<Profile> profiles = profileRepository.findAll();
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Kolkata"));

        for (Profile profile : profiles) {
            List<ExpenseDTO> todayExpenses =
                    expenseService.getExpensesForUserOnDate(profile.getId(), today);

            if (!todayExpenses.isEmpty()) {

                StringBuilder table = new StringBuilder();
                table.append("<table style='border-collapse:collapse;width:100%;'>");
                table.append("<tr style='background-color:#f4f6f8;'>");
                table.append("<th style='border:1px solid #ddd; padding:8px;'>#</th>");
                table.append("<th style='border:1px solid #ddd; padding:8px;'>Name</th>");
                table.append("<th style='border:1px solid #ddd; padding:8px;'>Amount</th>");
                table.append("<th style='border:1px solid #ddd; padding:8px;'>Category</th>");
                table.append("</tr>");

                int i = 1;
                for (ExpenseDTO expense : todayExpenses) {
                    table.append("<tr>");
                    table.append("<td style='border:1px solid #ddd; padding:8px;'>").append(i++).append("</td>");
                    table.append("<td style='border:1px solid #ddd; padding:8px;'>").append(expense.getName()).append("</td>");
                    table.append("<td style='border:1px solid #ddd; padding:8px;'>").append(expense.getAmount()).append("</td>");
                    table.append("<td style='border:1px solid #ddd; padding:8px;'>")
                            .append(expense.getCategoryName() != null ? expense.getCategoryName() : "N/A")
                            .append("</td>");
                    table.append("</tr>");
                }
                table.append("</table>");

                String body =
                        "Hi " + profile.getFullName() + ",<br/><br/>" +
                                "Here is a summary of your expenses for today:<br/><br/>" +
                                table +
                                "<br/><br/>Best regards,<br/>Money Manager Team";

                emailService.sendEmail(profile.getEmail(), "Your Daily Expense Summary", body);
            }
        }
        log.info("Job Completed : Sending Daily expense summary");
    }


}
