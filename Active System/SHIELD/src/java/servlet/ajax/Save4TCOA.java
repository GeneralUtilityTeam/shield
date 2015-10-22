/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import dao.IntelligenceDAO;
import dao.MissionDAO;
import entity.EEntity;
import entity.IntTuple;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Dan Torres
 */
public class Save4TCOA extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Save4TCOA</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Save4TCOA at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        int missionID = (int) session.getAttribute("missionID");
        String ccStr = request.getParameter("ccList");
        JSONArray ccJArr = new JSONArray(ccStr);

        ArrayList<EEntity> ccList = new ArrayList<EEntity>();
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

        for (Object obj : ccJArr) {
            EEntity cc = new EEntity();
            JSONObject jsob = new JSONObject(obj.toString());
            cc.setId(jsob.getInt("id"));
            cc.setLat(jsob.getDouble("lat"));
            cc.setLng(jsob.getDouble("lng"));
            String dateFromStr = jsob.getString("from");
            String dateToStr = jsob.getString("to");
            cc.setAddress(jsob.getString("address"));
            Date dateFrom = null;
            Date dateTo = null;
            try {
                dateFrom = format.parse(dateFromStr);
                dateTo = format.parse(dateToStr);
                if (dateFrom != null) {
                    cc.setDateFrom(dateFrom);
                }
                if (dateTo != null) {
                    cc.setDateTo(dateTo);
                }
            } catch (ParseException ex) {
                Logger.getLogger(SaveSource.class.getName()).log(Level.SEVERE, null, ex);
            }

            ccList.add(cc);
        }

        IntelligenceDAO intlDAO = new IntelligenceDAO();
        
        MissionDAO msonDAO = new MissionDAO();
        msonDAO.ResetMission(missionID, 4);
        boolean success = intlDAO.UpdateCCOfMission(missionID, ccList);

        if (success) {
            int missionStatus = msonDAO.AdvanceMissionStatus(missionID, 4);
            
            msonDAO.ResetMission(missionID, 5);
            if (missionStatus != 0) {
                session.setAttribute("missionStatus", missionStatus);
            }
        }
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("<strong>Threat Course of Action</strong> has been <strong>saved.</strong>");
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
