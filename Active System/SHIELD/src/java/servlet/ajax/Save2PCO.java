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
import entity.Task;
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
public class Save2PCO extends HttpServlet {

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
            out.println("<title>Servlet Save2PCO</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Save2PCO at " + request.getContextPath() + "</h1>");
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
        int editorID = (int)session.getAttribute("userID");
        int missionID = (int)session.getAttribute("missionID");
        String entityJSON = request.getParameter("entityArr");
        System.out.println("Save2PCO: /n" + entityJSON);
        
        //TESTING
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("<strong>Characteristics Overlay</strong> has been <strong>saved.</strong>");
        
        ArrayList<EEntity> eentList = new ArrayList<EEntity>();
        JSONArray entityJArr = new JSONArray(request.getParameter("entityArr"));
        
        for(Object j : entityJArr){
            JSONObject jsob = new JSONObject(j.toString());
            EEntity eent = new EEntity();
            eent.setName(jsob.getString("name"));
            ArrayList<Excerpt> excrList = new ArrayList<Excerpt>();
            for(Object id : jsob.getJSONArray("excrList")){
                Excerpt excr = new Excerpt();
                int x = (int)id;
                excr.setId(x);
                excrList.add(excr);
            }
            eent.setExcrList(excrList);
            eentList.add(eent);
        }
        MissionDAO msonDAO = new MissionDAO();
        IntelligenceDAO intlDAO = new IntelligenceDAO();
        boolean success = intlDAO.AddEEntitiesToMission(missionID, editorID, eentList);
        int missionStatus = (int)session.getAttribute("missionStatus");
        if(missionStatus == 2){
            missionStatus = msonDAO.AdvanceMissionStatus(missionID);
            session.setAttribute("missionStatus", missionStatus);
        }
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("<strong>Characteristics Overlay</strong> has been <strong>saved.</strong>");
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
