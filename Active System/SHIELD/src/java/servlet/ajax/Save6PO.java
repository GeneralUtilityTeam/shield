/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import dao.IntelligenceDAO;
import dao.MissionDAO;
import entity.EEntity;
import entity.Excerpt;
import entity.PsyopObjective;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
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
public class Save6PO extends HttpServlet {

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
            out.println("<title>Servlet Save6PO</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Save6PO at " + request.getContextPath() + "</h1>");
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
        int editorID = (int) session.getAttribute("userID");
        int missionID = (int) session.getAttribute("missionID");

        JSONArray crJArr = new JSONArray(request.getParameter("saveCR"));
        ArrayList<EEntity> cvList = new ArrayList<EEntity>();

        for (Object obj : crJArr) {
            EEntity cv = new EEntity();
            JSONObject jsob = new JSONObject(obj.toString());
            cv.setId(jsob.getInt("id"));
            PsyopObjective po = new PsyopObjective();
            po.setText(jsob.getString("po"));
            cv.setPo(po);
            ArrayList<PsyopObjective> spoList = new ArrayList<PsyopObjective>();
            
            for(Object obj2 : jsob.getJSONArray("spoList")){
                PsyopObjective spo = new PsyopObjective();
                JSONObject jsob2 = new JSONObject(obj2.toString());
                spo.setText(jsob2.getString("text"));
                ArrayList<Integer> cvIDList = new ArrayList<Integer>();
                for(Object id : jsob2.getJSONArray("cvIDList")){
                    int x = Integer.parseInt((String)id);
                    cvIDList.add(x);
                }
                spo.setCvIDList(cvIDList);
                
                spoList.add(spo);
            }
            cv.setSpoList(spoList);
            
            cvList.add(cv);
        }
        MissionDAO msonDAO = new MissionDAO();
        
        boolean success = msonDAO.SavePOSPOOfMission(missionID, cvList);
//        if (success) {
//            int missionStatus = msonDAO.AdvanceMissionStatus(missionID, 6);
//            if (missionStatus != 0) {
//                session.setAttribute("missionStatus", missionStatus);
//            }
//        }
        
        
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("<strong>Psychological Operations Objective</strong> has been <strong>saved.</strong>");
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
